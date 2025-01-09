cd grocerymonkey_client 
call npm run build && call copy_build.bat
cmd /c git_add.bat
echo Client source added to git
cd ../grocerymonkey_server
cmd /c git_add.bat
echo Server source added to git
cd ..
cmd /c git_add.bat
echo Source added to master git

