#!/bin/sh

# specify plan file
plan="$1"
numOfShelfs=$(jq ".shelfArray[]" < "$plan" | jq length | wc -l)

for shelf in $(seq 0 $((numOfShelfs - 1)) )
do
    numOfProd=$(jq ".shelfArray[$shelf]" < "$plan" | jq length)
    for prod in $(seq 0 $((numOfProd - 1)) )
    do  
        jq ".shelfArray[$shelf][$prod] += {prodWidth: 0}" < "$plan" > "$plan".tmp
        mv "$plan".tmp "$plan"
    done
done