#!/usr/bin/bash

# Description: This file contains multiple Mega commands to do different actions using a specific user's account with the MEGAcmd CLI tool. The documentation and source code of that tool is available here: "https://github.com/meganz/MEGAcmd".

# login: connects to the mega client, requires email and password to be defined
# as env variables "MEGA_EMAIL" and "MEGA_PASSWORD" respectively.
#
# An authentication code (6 characters OTP auth number. Usually generated with an app like Microsoft Authenticator).
login() {
    # Check that both email and password env vars are set before trying to login
    # this and other similar code blocks use "Parameter Expansion" Bash concept explained here:
    # https://stackoverflow.com/questions/307503/whats-a-concise-way-to-check-that-environment-variables-are-set-in-a-unix-shell
    #
    : "${MEGA_EMAIL:?Need to set MEGA_EMAIL non-empty}"
    : "${MEGA_PASSWORD:?Need to set MEGA_PASSWORD non-empty}"
    
    mega-login $MEGA_EMAIL $MEGA_PASSWORD
}

# logout: Logs out of mega client.
logout() {
    mega-logout
}

# list_synchronizations: List all synchronizations happening on a specific machine, both Running and stoped sinchronizations are listed here using a table format.
list_synchronizations() {
    mega-sync
}

# start_synchronization: Start a synchronization between a local folder and a remote folder
# the synchronization keeps running until it is stoped or deleted explicitly.
start_synchronization() {
    LOCAL_FOLDER=$1
    REMOTE_FOLDER=$2
    echo "LOCAL_FOLDER: $LOCAL_FOLDER"
    echo "REMOTE_FOLDER: $REMOTE_FOLDER"
    if [ -z $LOCAL_FOLDER ]; then
        echo "(start_synchronization): LOCAL_FOLDER variable cannot be null or empty"
        exit 1;
    fi
    if [ -z $REMOTE_FOLDER ]; then
        echo "(start_synchronization): REMOTE_FOLDER variable cannot be null or empty"
        exit 1;
    fi
    
    mega-sync $LOCAL_FOLDER $REMOTE_FOLDER
}

stop_synchronization() {
    SYNCHRONIZATION_ID=$1
    echo "SYNCHRONIZATION_ID: $SYNCHRONIZATION_ID"
    if [ -z $SYNCHRONIZATION_ID ]; then
        echo "(start_synchronization): SYNCHRONIZATION_ID variable cannot be null or empty"
        exit 1;
    fi
    mega-sync -s $SYNCHRONIZATION_ID
}

delete_synchronization() {
    SYNCHRONIZATION_ID=$1
    echo "SYNCHRONIZATION_ID: $SYNCHRONIZATION_ID"
    if [ -z $SYNCHRONIZATION_ID ]; then
        echo "(start_synchronization): SYNCHRONIZATION_ID variable cannot be null or empty"
        exit 1;
    fi
    mega-sync -d $SYNCHRONIZATION_ID
}

get_folder() {
    REMOTE_FOLDER=$1 # PATH of remote folder
    LOCAL_FOLDER=$2 # PATH of local folder

    echo "LOCAL_FOLDER: $LOCAL_FOLDER"
    echo "REMOTE_FOLDER: $REMOTE_FOLDER"
    if [ -z $LOCAL_FOLDER ]; then
        echo "(start_synchronization): LOCAL_FOLDER variable cannot be null or empty"
        exit 1;
    fi
    if [ -z $REMOTE_FOLDER ]; then
        echo "(start_synchronization): REMOTE_FOLDER variable cannot be null or empty"
        exit 1;
    fi

    mega-get $REMOTE_FOLDER $LOCAL_FOLDER
}

# Make all functions available to be consumed as scripts from CLI.
"$@"
