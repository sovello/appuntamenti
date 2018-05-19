#!/usr/bin/perl -T
use strict;
use warnings;
use JSON;
use CGI;

use DBI;
    
my $cgi = new CGI;

#my $query = $cgi->param('POSTDATA');
#my $appointmentObj = decode_json $post;
my $driver = "SQLite";
my $db = "../db/appointment.db";
my $dsn = "DBI:$driver:dbname=$db";
my $userid = "";
my $passwd = "";
my $dbh = DBI->connect($dsn, $userid, $passwd, {PrintError=>1,RaiseError=>1}, ) or die $DBI::errstr;
my $drop = $dbh->prepare("DROP TABLE IF EXISTS appointment");
my $create = $dbh->prepare("CREATE TABLE IF NOT EXISTS appointment(id INTEGER PRIMARY KEY, time TEXT, date TEXT, description TEXT)");
$create->execute();

my $date = $cgi->param('date');
my $time = $cgi->param('time'); 
my $desc = $cgi->param('description');
my $insert = $dbh->prepare("INSERT INTO appointment (`time`, `date`, `description`) VALUES (?, ?, ?)");
$insert->execute($time, $date, $desc);

my $select = $dbh->prepare("SELECT `id` AS id, `time` AS time, `date` AS date, `description` AS description FROM appointment");
$select->execute();

my @results;
#my $results = $select->fetchall_arrayref();
while (my $row = $select->fetchrow_hashref) {
    push @results, $row;
}

$dbh->disconnect();


my $json->{"appointments"} = \@results;
my $appointments = encode_json $json;


# create a JSON string according to the database result
my $result = (1) ? 
qq{{"success" : "$desc", "time" : "$time"}} : 
qq{{"error" : "did not get anything "}};
# return JSON string
print $cgi->header(-type=>"application/json", -charset=>"utf-8");
print $appointments;
