#!/usr/bin/perl -T
use strict;
use warnings;
use JSON;
use CGI;

my $cgi = new CGI;

#my $query = $cgi->param('POSTDATA');
#my $appointmentObj = decode_json $post;

my $date = $cgi->param('date');
my $time = $cgi->param('time'); 
my $desc = $cgi->param('description');

# create a JSON string according to the database result
my $result = (1) ? 
qq{{"success" : "$desc", "time" : "$time"}} : 
qq{{"error" : "did not get anything "}};
# return JSON string
print $cgi->header(-type=>"application/json", -charset=>"utf-8");
print $result;
