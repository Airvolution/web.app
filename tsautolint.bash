#!/bin/bash

BOLD="\033[1m"
RED="\033[0;31m"
BLUE="\033[0;34m"
CYAN="\033[0;36m"
GREEN="\033[0;32m"
NC="\033[0m"

clear
files=( $(find app -name '*.ts') )
printf "${NC}\nRunning ${BOLD}TSLint${NC} on ${GREEN}${BOLD}${#files[@]} .ts${NC} files.\n"

for f in ${files[@]}
do
  printf "${NC}Running ${BOLD}TSLint${NC} on file: ${CYAN}${BOLD}$f ${RED}${BOLD}\n"
  tslint --config ./tslintrules.json $f
done

printf "${GREEN}\n\nIf you saw ${RED}${BOLD}red${GREEN}, please fix it. ${BLUE}Goodbye, ${BOLD}${USER}.${NC}\n\n\n"

