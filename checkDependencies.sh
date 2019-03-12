if [ "$1" != "--skipInstall" ]; then
    echo 'Installing globally dependency-check and retire...'
    npm install -g dependency-check
    npm install -g retire
    echo 'Installed'
fi

if [ "$2" != "" ]; then
    echo 'Traveling to ' $2
	cd $2
fi

echo 'Checking dependencies...'

#dependency-check
echo 'Checking if all dependencies used in code are listed in package.json...'
dependency-check ./package.json
out=$?
if [ "$out" != 0 ]; then
    exit $out
fi

echo 'Checking if all dependencies listed in package.json are used in code...'
dependency-check ./package.json --unused --no-dev --no-peer
out=$?
if [ "$out" != 0 ]; then
    exit $out
fi

#retire
print 'Looking for use of known vulnerable js files and node modules...'
retire -n
out=$?
if [ "$out" != 0 ]; then
    exit $out
fi

exit 0