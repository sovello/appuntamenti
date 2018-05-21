# Appointment Scheduler

A basic Create-Read application backed by jQuery and PERL.

### Installation
It is only tested to work for Ubuntu 16.04

### Download the site
Clone this into your development directory. I always use /opt/, so I am going to do it there:

```
cd /opt/
git clone https://github.com/sovello/appuntamenti.git appointment
cd appointment
```

### Dependencies

Install JSON and CGI modules.

```
sudo cpan JSON
sudo cpan CGI
```

* CGI is great for handling Common Gateway Interface requests and responses (`POST` and `GET`).
You can read about its details [here](http://search.cpan.org/~lds/CGI.pm-3.43/CGI.pm).

* JSON for general JSON processing. You can also read about the module [here](http://search.cpan.org/~ishigaki/JSON-2.97001/lib/JSON.pm).


Then, since this is a database based application, we need to have a database interface. For this, PERL has
a common interface, DBI whose details can be found [here](http://search.cpan.org/~timb/DBI-1.641/DBI.pm).
For this case, we will also need a SQLite specific driver (DBD::SQLite) which allows PERL to talk to SQLite.

If you don't have sqlite installed in Ubuntu you can run install it by running this command:

```
sudo apt-get install sqlite3
```

Then, to install DBI and DBD::SQLite run these commands

```
sudo cpan DBI
sudo cpan DBD::SQLite
```

## Enable CGI module

To be able to run a CGI-backed application, we need to have CGI enabled in apache2. This CGI module is
different from the one that we have just installed above. This is the module which enables apache2
to run CGI scripts and direct their output to _a web browser_.

Since Ubuntu 14.04 to 16.04 configurations for apache2 changed. I hope they have not for 18.04 as I have not yet tested.
But, we will need to make sure the following:

* That the cgi-bin configuration have been enabled. If you do not have this file `/etc/apache2/conf-enabled/serve-cgi-bin.conf` (which is set by default) then you need to run the command below, otherwise (if you do) you don't have to run the command:
  ```
  sudo ln -s /etc/apache2/conf-available/serve-cgi-bin.conf /etc/apache2/conf-enabled/serve-cgi-bin.conf
  ```

* That the CGI module has also been enabled. For some reason, the CGI module is not enabled by default like the CGI conf. So, you will need to run this command in order to enable CGI for the web server.
  ```
  sudo ln -s /etc/apache2/mods-available/cgi.load /etc/apache2/mods-enabled/cgi.load
  ```

After running these two commands, then you need to reload the web server for the new configurations to take place.

## Serving our CGI scripts
By default, apache2 looks for cgi-scripts in the path `/usr/lib/cgi-bin/`, which means we have two options:

* Keep all our scripts there, and take advantage of the readily available system configuration for security! OR

* Create our own directory to host our CGI scripts. this comes with a caveat. We will need to either use .htaccess file
(which experts say .htaccess files have an impact on performance).

If we decide to go by the first option, we do not need to keep our files there, we will instead make use a SymLink and allow apache to follow Symbolic links.

For this application to run, we will need to run these commands:

```
sudo ln -s /opt/appointment/cgi-bin /usr/lib/cgi-bin/appointment
sudo chmod 755 /usr/lib/cgi-bin/appointment
```

### Allow apache2 to follow symbolic links

This is important so that apache2 can serve our scripts which have been symlinked to the default cgi-bin.

Then open this file `/etc/apache2/conf-available/serve-cgi-bin.conf`
and change the this part in the file to look like below:

```
<Directory "/usr/lib/cgi-bin">
   AllowOverride None
   Options +ExecCGI -MultiViews +FollowSymLinks
   Require all granted
</Directory>	
```

## Create database

Create database in db/appointment.db. Make sure the ownership of db is set to
www-data. Otherwise, the app is going to fail to write.

Change the ownership by running the command

```
sudo chown db www-data:www-data db
```

If the database is not created, the system creates it automatically.

## Starting the site
At this point hoping everything went OK (there maybe surprises at times though), we need to launch our app.

We make our site available to apache2

```
sudo ln -s /opt/appointment/web /var/www/html/appointment
```

We will restart apache2 webserver by running the command

```
sudo service apache2 restart
```
and then visit the site through [this url](http://localhost/appointment) (http://localhost/appointment)


## My take-away points for learning PERL in about 18 hrs

* I used approximately 18 hrs, main challenge being most materials to learn
PERL are old and looks like there's not many Monks in the PERL monasteries
these days. I could hardly see support questions posted after 2016, maybe all
those who use PERL are experts or there's nobody using PERL.

* The syntax is a bit different from other common languages that I have worked with.
Yes, there's semicolons, and curly braces and parentheses and the arrow operator, but
the hashes syntax the functions and Modules (equivalents of classes) is not very intuitive.

* It is a nice language, I would want to do another non-trivial project in one of the next weekends.
For the coming days I will keep learning this to become more familiar.

* Everytime I learn a new language, (not only a programming language), I realize
I become better at languages that I already know. A new language gives us
a new perspective to look at what we already know.


## Areas of improvement:
* Set own configuration for cgi-bin for this site only. This would still require changing AllowOverride in
the global apache config.
* Organize jQuery code into modules. However the literal was OK for this case considering the time I had.
* Create a more elegant database abstraction for DBI and DBD::SQLite using modules.
* Create a docker image (DockerFile) to make the setup process easier and more portable.

* These resources have been very useful in the process
  * [Zetcode Perl SQLite Tutorial](http://zetcode.com/db/sqliteperltutorial/)
  * [Introductory Perl Tutorial Course for Windows](https://www.gossland.com/perlcourse/default/index)
  * [Gabor Szabo's Perl Tutorial](https://perlmaven.com/perl-tutorial)
    * Gabor Szabo Perlmaven is a very great site I would recommend.
  * [Programming the Perl DBI](https://docstore.mik.ua/orelly/linux/dbi/index.htm)
  * [Perl Monks site](http://www.perlmonks.org)
  * [University of Washington Perl Reference](http://www.washington.edu/perl5man/)