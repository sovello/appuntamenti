#!/usr/bin/perl

use strict;
use warnings;

use JSON;
use CGI;

my $cgi = CGI->new();

print $cgi->header('application/json;charset=UTF-8');

my $data = $param('appointment');

my @appointmentObj = @{decode_json($data)}

print $cgi->header('text/plain;charset=utf-8');
print $appointmentObj.description."\n";
