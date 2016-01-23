#!/bin/bash

BOLD="\033[1m"
RED="\033[0;31m"
BLUE="\033[0;34m"
CYAN="\033[0;36m"
GREEN="\033[0;32m"
NC="\033[0m"

clear
files=( $(find app -name '*.ts') )
printf "${NC}\nWould you like to lint ${GREEN}${BOLD}${#files[@]} .ts${NC} files? Press ${GREEN}${BOLD}[y]${NC} to continue..."

read -n 1 key_pressed
printf "\n\n"

if [ "$key_pressed" == "y" ]; then
  #printf "${BLUE}\n=====================================================================================================\n\n"
  for f in ${files[@]}
  do
    printf "${NC}Running ${BOLD}TSLint${NC} on file: ${CYAN}${BOLD}$f ${RED}${BOLD}\n"
    tslint --config ./tslintrules.json $f
  done
  #printf "${BLUE}\n=====================================================================================================\n\n"
  printf "${GREEN}\n\nIf you saw ${RED}${BOLD}red${GREEN}, please fix it. ${BLUE}Goodbye, ${BOLD}${USER}.${NC}\n\n\n"
else
  printf "${RED}${BOLD}Aborted.\n\n${NC}"
fi
