# Jinfoteur Backend

NodeJS backend for JinfoTeur system made with Hexagonal Architecture and DDD as a modular monolith.

## Most Important Domain Concepts of this app.

1. Everything's based around the concept of integrations with other services whenever possible, ideally they should be cheap or "free" (able to be self-hosted).

2. Categories and tags will act as a means to organize information, the idea is to make the system as flexible as possible. Initially most categories will be created as default categories, with the possibility to create more categories with a default UI/UX and functionality (personalization in this matter is not a priority).

3. It will be possible to create arbitrary subcategories within any subcategory to further organize its information.

4. Global search functionality will be implemented to browse information more easily.