# cassielawfirm [![Build Status](https://travis-ci.org/Catenology/cassielawfirm.svg?branch=master)](https://travis-ci.org/Catenology/cassielawfirm)

# How to update

## Update from source code

The webiste is built with [Jekyll](http://jekyllrb.com/docs/home/), a liquid templating tool that dynamically generates static html and assets files according to source code. Editing from the source code is the easiest and most maintainable way to update this website.

### Prerequisites and technologies used

- [Git 2.9](https://git-scm.com/)
- [NodeJS 4.x](https://nodejs.org/en/)
- [Ruby 2.3](https://www.ruby-lang.org/en/)
- [Jekyll 3.1](http://jekyllrb.com/)
- [Gulp 3.9](http://gulpjs.com/)
- [Sass](http://sass-lang.com/)
- [BabelJS](https://babeljs.io/)

### Steps

1. Clone the repo `git clone https://github.com/Catenology/cassielawfirm.git`
2. Go to the cloned repo directory and install dependencies `npm install`
3. Refer to the below file structure and make changes. If you're not familiar with Jekyll, just follow existing naming convention, or replace existing files without changing filename.

```
+-- _ux   //Misc files for designers and editors
+-- src   //Jekyll source code
|   +-- _branchs  //A customized Jekyll collection for branch office address information. Each office has a page.
|   |   +-- branch-xxx.markdown
|   |   +-- branch-yyy.markdown
|   |   +-- ...
|   +-- _includes   //Fixed components that are the same on every page
|   |   +-- footer.html
|   |   +-- head.html
|   |   +-- header.html
|   +-- _layouts    //Different page layout templates
|   |   +-- bio.html    //For team member detail page
|   |   +-- branch.html   //For branch office detail page
|   |   +-- default.html
|   |   +-- page.html
|   |   +-- post.html
|   +-- _members    //A customized Jekyll collection for team members. Each member has a page.
|   |   +-- member-xxx.markdown
|   |   +-- member-yyy.markdown
|   |   +-- ...
|   +-- _posts    //News, blog posts, articles that can be sorted by date. Currently not used.
|   |   +-- 2016-09-16-post-title.markdown    //Make sure to put date as filename prefix otherwise Jekyll won't find them.
|   |   +-- 2016-09-20-post-title.markdown
|   |   +-- ...
|   +-- _draft    //Draft posts
|   +-- _sass   //Bite-sized stylesheets written in Sass. For compilation only.
|   |   +-- _variables.scss
|   |   +-- _mixins.scss
|   |   +-- ...
|   +-- _services   //A customized Jekyll collection for services. Each service category has a page.
|   |   +-- service-xxx.markdown
|   |   +-- service-yyy.markdown
|   |   +-- ...
|   +-- css   //Styelsheets and fonts that are not manually maintained go here
|   |   +-- _vendor   //3rd party stylesheets
|   |   |   +-- ...
|   |   +-- fonts   //font files
|   |   |   +-- ...
|   |   +-- main.scss   //This is the entry point for Jekyll to compile sass files in _sass folder
|   +-- files   //Put files for download here
|   +-- images  //Image assets used for the website
|   |   +-- favicon   //favicon is the little icon that shows up on browser tab and mobile phone bookmark
|   |   |   +-- android-icon-??x??.png
|   |   |   +-- ...
|   |   +-- bg-1.jpg    //The background image for Services section
|   |   +-- bbrlogo.png   //Logo assets
|   |   +-- ...
|   |   +-- hero-1.jpg    //The background image for hero slideshow
|   |   +-- hero-2.jpg
|   |   +-- hero-3.jpg
|   |   +-- member-xxx-yyy.jpg    //Team member photo for detail page
|   |   +-- member-xxx-yyy-sm.jpg   //Team member photo for thumbnail view. Use 500x500 images only. Make sure the part before "-sm" matches the detail page version.
|   +-- js    //JavaScripts
|   |   +-- _main.js    //For compilation only, written in ES2015. Gulp will compile it to regular main.js
|   +-- _config.yml   //Jekyll front matter file
|   +-- careers.md    //Loose page, Careers information
|   +-- privacy.md    //Loose page, Privacy terms
|   +-- index.html    //The entry point of this website.
|   +-- feed.xml    //For RSS subscription. Currently not used.
+-- .travis.yml   //For Continuous Integration. Only use this file if you deploy it from GitHub repo and via TravisCI (preferred way)
+-- favicon.ico   //The default favicon in root directory
+-- gulpfile.js   //All the build, optimization, deploy tasks go here
+-- package.json    //node dependencies

```

4. In the [**_config.yml**](https://github.com/Catenology/cassielawfirm/blob/master/src/_config.yml#L13) file inside **src** folder, change the `url` to `http://127.0.0.1:4000` for local debugging
4. Build it with `gulp`
5. Go to the source code folder `cd src` and run `jekyll s` to preview changes, at `http://127.0.0.1:4000/cassielawfirm/`
6. Once you're happy with the changes, remember to change the `url` back to the real domain name (e.g. `http://mycompany.com`) before deployment. Also remove subdirectory from `baseurl` if the domain points to root.
8. Run `gulp` again to generate the website files for deployment.
9. The generated files will be in **dist** folder.
