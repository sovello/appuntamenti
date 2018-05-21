# Appointment Scheduler

A basic Create-Read application backed by jQuery and PERL.

### Installation
It is only tested to work for Ubuntu 16.04


### Dependencies

Install JSON and CGI modules.

`
sudo cpan JSON
sudo cpan CGI
`

* CGI is great for handling Common Gateway Interface requests and responses (`POST` and `GET`).
You can read about its details [here http://search.cpan.org/~lds/CGI.pm-3.43/CGI.pm].

* JSON for general JSON processing. You can also read about the module [here http://search.cpan.org/~ishigaki/JSON-2.97001/lib/JSON.pm]


Then, since this is a database based application, we need to have a database interface. For this, PERL has
a common interface, DBI whose details can be found [here http://search.cpan.org/~timb/DBI-1.641/DBI.pm]
For this case, we will also need a SQLite specific driver (DBD::SQLite) which allows PERL to talk to SQLite. If you don't have
sqlite installed in Ubuntu you can run `sudo apt-get install sqlite3`

To install DBI and DBD::SQLite

`
sudo cpan DBI
sudo cpan DBD::SQLite
`

Enable CGI module

sudo ln -s /etc/apache2/mods-available/cgi.load /etc/apache2/mods-enabled/cgi.load

Also make sure you have this

/etc/apache2/conf-enabled/serve-cgi-bin.conf

if not, then run
sudo ln -s /etc/apache2/conf-available/serve-cgi-bin.conf /etc/apache2/conf-enabled/serve-cgi-bin.conf

make symlink to cgi-bin default path
sudo ln -s /opt/appointment/cgi-bin /usr/lib/cgi-bin/appointment
allow +FollowSymLinks to Options in /etc/apache2/conf-enabled/serve-cgi-bin.conf
make sure you change permissions to 755

create database in db/appointment.db
change permission to 755

#need to make adjustments for this to work

This is a Create, Read jQuery app backed by Perl.
The aim was to get the basic app running in less than 20 hrs
of learning PERL.

### My take-away points for learning PERL in about 18 hrs
I used approximately 18 hrs, main challenge being most materials to learn
PERL are old and looks like there's not many Monks in the PERL monasteries
these days. I could hardly see support questions posted after 2016, maybe all
those who use PERL are experts or there's nobody using PERL.

http://zetcode.com/db/sqliteperltutorial/