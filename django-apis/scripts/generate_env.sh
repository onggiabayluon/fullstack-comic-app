#!/bin/bash
# USAGE: bash addEnvToHeroku.sh <filepath>

# SET VARIABLES ________________________________________________________________
input=$1
output=$1.sh

# DEFINE FUNCTION TO DELETE FILE _______________________________________________
function deleteIfExist {
   if test -f "$1"; then
      echo "$1 exists."
      unlink "$1"
   fi
}

# SHOW SCRIPT TITLE ____________________________________________________________
echo -e "Setting heroku variables for the file $input: \n"

# DELETE THE SH FILE IF IT EXISTS ______________________________________________
deleteIfExist "$output"

# READ THE CONTENT AND SAVE IN A SH FILE _______________________________________
while read -r line; do
   echo "heroku config:set $line" >> "$output"
done < "$input"

# EXECUTE THE SH FILE __________________________________________________________
bash "$output"

# DELETE THE SH FILE IF IT EXISTS ______________________________________________
deleteIfExist "$output"