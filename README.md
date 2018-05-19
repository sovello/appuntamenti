# Appointment Scheduler

Works for Ubuntu 16.04


install perl json module
sudo cpan JSON
sudo cpan CGI

http://zetcode.com/db/sqliteperltutorial/
install perl DBI
cpan DBI
install perl SQLite DBI
cpan DBI::SQLite

Enable CGI module

sudo ln -s /etc/apache2/mods-available/cgi.load /etc/apache2/mods-enabled/cgi.load

Also make sure you have this

/etc/apache2/conf-enabled/serve-cgi-bin.conf

if not, then run

sudo ln -s /etc/apache2/conf-available/serve-cgi-bin.conf /etc/apache2/conf-enabled/serve-cgi-bin.conf