import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    parentCategory: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    },
    subcategories: [{
      _id: {
          type: Schema.Types.ObjectId,
          ref: 'Category',
      },
      name: {
        type: String,
        required: true,
        trim: true,
      },
      parentCategory: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
      },
    }],
});

async function checkCategoryDuplicatesTopLevel(categoryName: string) {
  const topLevelCategories = await category.find({ "$or": [
    { parentCategory: { $exists: false }},
    { parentCategory: null },
    { parentCategory: undefined },
  ]});

  console.log({topLevelCategories});

  const topLvlCategoriesDuplicated = await Promise.all(topLevelCategories.map(async (category) => {
    return category.name === categoryName;
  }));

  console.log({topLvlCategoriesDuplicated});

  return topLvlCategoriesDuplicated.includes(true);
}

/** Check if a category name exists among the children of parentId */
async function checkDuplicatedSiblingName (payload: {
  categoryName: string,
  parentId: mongoose.Types.ObjectId | null,
}): Promise<boolean> {

  const { categoryName, parentId } = payload;
  const parentCategory = await category.findOne({ _id: parentId });

  // Handle duplicated names at top level
  if (!parentCategory) {
    const isDuplicatedAtTopLvl = await checkCategoryDuplicatesTopLevel(categoryName);
    if (isDuplicatedAtTopLvl) return true;
  }
  
  const subcategories = parentCategory?.subcategories ?? [];

  const categoriesDuplicated = await Promise.all(subcategories.map(async subcategory => {
    const subcategoryItem = await category.findOne({ _id: subcategory._id });
    return subcategoryItem?.name === categoryName;
  }));
  
  return categoriesDuplicated.includes(true);
}

// Add custom validation to ensure unique names at the same level
categorySchema.pre('save', async function(next) {
    if (this.isNew) {
      const parentId = this.parentCategory?._id ?? null;
      const isSiblingDuplicated = await checkDuplicatedSiblingName({ 
        parentId,
        categoryName: this.name,
      });

      if (isSiblingDuplicated) {
        throw new Error('Error: A category with this name already exists in the same parent category.');
      }
    }
  });

async function addSubcategoryToParentCategory(payload: { 
  subcategoryId: mongoose.Types.ObjectId,
  parentCategoryId: mongoose.Types.ObjectId | null,
}) {
  const { subcategoryId, parentCategoryId } = payload;
  const subcategory = await category.findOne({ _id: subcategoryId });

  await category.updateOne(
    { _id: parentCategoryId },
    { $push: { subcategories: subcategory } },
  ).catch(err => console.error(`Error while adding children category to parent category. ${err}`));
}

// Add subcategory to parent category after creating it (if applies)
categorySchema.post('save', async function() {
  await addSubcategoryToParentCategory({ 
    parentCategoryId: this.parentCategory?._id ?? null,
    subcategoryId: this._id,
  });
});


const category = model('Category', categorySchema);
export default category;
