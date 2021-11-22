#!/usr/bin/env bash

# takes the tag as an argument (e.g. v0.1.0)
if [ -n "$1" ]; then
    if [[ "$1" =~ ^[0-9]{0,3}\.[0-9]{1,3}\.[0-9]{1,3}$ ]]; then
        read -r -p "Are you sure to upgrade to v$1 ? [y/N] " response
        if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]
        then
            # update the version in const.ts
            sed "s/^export const CARD_VERSION = .*$/export const CARD_VERSION = '${1#v}';/" -i src/const.ts
            git add src/const.ts
            git commit -m "chore(release): prepare for v$1"
            git tag "v$1"
            git push --atomic origin main "v$1"
        else
            echo "Operation canceled"
        fi
    else
        echo "The version should be X.X.X"
    fi
else
	echo "Please provide a tag"
fi