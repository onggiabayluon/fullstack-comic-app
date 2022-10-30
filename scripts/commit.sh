#!/bin/bash
# die script -- just in case
die() { echo "$@" 1>&2 ; exit 1; }

############################################################
# Help                                                     #
############################################################
Help()
{
   # Display Help
   echo "Add description of the script functions here."
   echo
   echo "Syntax: scriptTemplate [-b|h]"
   echo "options:"
   echo "b     Checkout new Branch"
   echo "h     Print this Help."
   echo
}
############################################################
# checkout                                                     #
############################################################
Checkout()
{
  echo "${green}>>> Git checkout -b branch_name"
  read -r -p "Type your branch: " branch|| exit 100
  test -z "$branch" && exit 100


  git checkout -b "$branch" || exit 100

}

############################################################
# Push                                                     #
############################################################
Push()
{
   # get the argument message
   defaultMessage="$1"

   # If no commit message is passed, use current date time in the commit message
   if [[ -z "${defaultMessage// }" ]]
      then
         defaultMessage=$(date '+%Y-%m-%d %H:%M:%S')
   fi

  # git add .
  echo -e "\n"
  echo "${green}>>> Git add ."
  git add . && \

  # git commit -m "$2"
  echo -e "\n"
  echo "${green}>>> Git commit -m "$2""
  read -r -p "Type your Commit message: " message|| exit 100
  test -z "$message" && message=$defaultMessage
  git commit -m "$message" || exit 100

  # git push
  echo -e "\n"
  echo "${green}>>> Git push origin head"
  echo "${green}>>> Push in Progress... Pls Wait ..."
  git push origin head || exit 100
}

############################################################
############################################################
# Main program                                             #
############################################################
############################################################

# Colors
red=`tput setaf 1`
green=`tput setaf 2`
reset=`tput sgr0`

# Set variables
PUSH=True

############################################################
# Process the input options. Add options as needed.        #
############################################################
# Get the options
while getopts ":hb" option; do
   case $option in
      h) # display Help
         PUSH=False
         Help
         break;;
      b) # Checkout new branch 
         Checkout
         break;;
      \?) # Invalid option
         echo "Error: Invalid option"
         exit;;
   esac
done


if [ "$PUSH" == True ]
then
  Push
fi

exit
  
  


  
