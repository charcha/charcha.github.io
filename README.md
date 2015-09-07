# Charcha

Charcha Official Site: http://charcha.space/

Development Model: http://nvie.com/posts/a-successful-git-branching-model/

This project follows a three branch model

* __master__: The actual site
* __develop__: The code that will go for the next master release
* __testing__: Which will be used to test various features, before integrating into develop.

If you would like to contribute to the project in terms of features or documentation, follow the steps given below. 
- Fork and clone the repo.
- Checkout to the testing branch.
- Play around. Try everything you would like to. 
- Once you are successful and satisfied (read as after enough testing) with any modifications you have made, merge you local changes to the repo's testing branch. 

Another way to contribute to Charcha would be to file bugs. Raise an issue in the GitHub repo and we will work on it before our next release.

When we are ready for a particular release, we will merge the testing branch to the develop branch and start some more testing. Once we are good to go and the release date is near, we will fork the develop branch to a version branch and also merge it to the master branch.
