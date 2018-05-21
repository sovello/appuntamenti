#!/usr/bin/perl
use strict;
use warnings;
use JSON;
use CGI;
use DBI;

use FindBin;
use lib "$FindBin::Bin/..";
use DBConnection;
use Appointment;

my $cgi = new CGI;

my $db = "../db/appointment.db";
my $userid = "";
my $passwd = "";

my $dbconn = DBConnection->new;
my $appt = Appointment->new;

my $dbh = $dbconn->connect($db, $userid, $passwd);

if( $dbh == 0){
    my $result = qq{{"success" : "We could not connect to the database at this time"}};
# return JSON string
    print $cgi->header(-type=>"application/json", -charset=>"utf-8");
    print $result;
}

my $drop = $dbh->prepare("DROP TABLE IF EXISTS appointment");
my $create = $dbh->prepare("CREATE TABLE IF NOT EXISTS appointment(id INTEGER PRIMARY KEY, time TEXT, date TEXT, description TEXT)");
$create->execute();

if($cgi->param("id")){
    my $date = $cgi->param('date');
    my $time = $cgi->param('time'); 
    my $desc = $cgi->param('description');
    $appt->insert($dbh, $date, $time, $desc);
}

my @results;

if($cgi->param("search_query")){
    my $desc = $cgi->param("search_query");
    # load all people
    @results = $appt->search($dbh, $desc, 2);    
}
else{    
    # load all people
    @results = $appt->search($dbh, undef, 1);
}

$dbh->disconnect();
my $json->{"appointments"} = \@results;
my $appointments = encode_json $json;


# return JSON string
print $cgi->header(-type=>"application/json", -charset=>"utf-8");
print $appointments;
