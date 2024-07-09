# To Do App
To Do List app utilizing React.js and Django Backend

I started off by installing tools / frameworks and then setting up a virtual environment
- python -m venv myenv (installs myenv)
- source myenv/bin/activate (starts the virtual environment)

Install psycopg for usage in PostgreSQL
- pip install psycopg

Install Django
- python -m pip install Django
- Django version will remain 4.2.13 as I had trouble installing python 3.10 from 3.9.4

Then I need to create the project
- django-admin startproject backend (this will create the backend folder)
- THis will autogenerate code for the initial setup

If I want to be able to run the server, then I just need to input this command
- python manage.py runserver
- I should not be utilizing this as a production environment

Then I want to create my startapp. This basically adds additional files to my backend directory which creates a new application
within the existing Django project. The files added are for the specific applications functionality.
- python manage.py startapp todo (name of app)

Once we have the startapp and startproject in order, we can start working on the models and etc. Let's create a view first.
A view is a function or a class that receives a web request and returns a web response. Views are responsible for handling the logic
of your web app, such as retreiving data from the db, processing user input, and rendering HTML templates or returning data in other 
formats such as JSON. This is basically like the app.py in Flask where we're returning HTML (render_template from flask)
- Go into views.py and then create a function with the parameter of request return HttpResponse with a parameter of the text you want to return
- def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")
- to call the view, we need to map it to a URL


Nice, so then let's move onto setting up the DB / Creating the model
- First we're going to make sure that the db is set up correctly. Since this is a small time project, we want to be able to 
- use SQLite3 instead of Postgres. Fortunately, in our settings.py, SQLite3 is already set up for us when we started our django app
- if we were to use Postgres instead, we'd need to make some changes to our DATABASE variable, but we'll leave as it is for now.
- THen we need to create our Model for our Task. Once we've created our Task Model, we need to register it with our admin.py.
- Lastly! We need to add it to our INSTALLED_APPS in our settings.py.

Once that's completed, run python manage.py makemigrations / migrate and check out sqlite3 db to see if our task populated.
- There was a big issue with my backend module not showing up when I was trying to seed using python todo/seed.py. So I created an extra line of
- Code where I established the default path in my seed file: sys.path.append('/home/kwanj/projects/To-Do/my_project') 

Next I need to start on the API framework now for the CRUD operation.
- Let's start by installing djangorestframework and django-cors-headers
- pipenv install djangorestframework django-cors-headers
- Then lets' add them to our INSTALLED_APPS and add corsheaders to our Middleware

Then we need to create serializers
- Serializers are ways to convert model instances to JSON so that the frontend can work with the received data.
- start by creating a serializers.py file within the todo app


Now let's get working on the frontend. Navigate towards the root directory and npx create-react-app frontend
