#! /bin/zsh
structure_name=$1

components_root='../components/'
constants_root='../constants/'
actions_root='../actions/'
containers_root='../containers/'
reducers_root='../reducers/'

#for component
touch "${components_root}${structure_name}.js"
touch "${components_root}${structure_name}-app.js"

#for container
touch "${containers_root}wrapped-${structure_name}.js"

#for constants
touch "${constants_root}${structure_name}-types.js"

#for actions
touch "${actions_root}${structure_name}-actions.js"

#for reducers
touch "${reducers_root}${structure_name}-reducers.js"
