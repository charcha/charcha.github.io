# charcha.github.io
Charcha Official Site

Development Model : http://nvie.com/posts/a-successful-git-branching-model/

We will go with a three branch model
1. Master : The actual site
2. develop : The code that will go for the next master release
3. testing : Which will be used to test various features, before integrating into develop.

So we will fork the repo, checkout to the testing branch.
We will create a local fork of the testing branch, and test things, and once succesful, we will be merging them to the testing branch.
Once, we are ready for any release, we will merge the testing branch to the develop branch and start some more testing.
Once we are good and the release date is near, we will fork the develop branch to a version branch and also into the master branch.
