#!/user/bin/perl

package Appointment;

use strict;
use DBI;

sub new {
    my $class = shift;
    my $self = {};
    bless $self, $class;
    return $self;    
}

sub insert {
    my ($self, $dbh, $date, $time, $description) = @_;
    my $insert = $dbh->prepare("INSERT INTO appointment (`time`, `date`, `description`) VALUES (?, ?, ?)");
    $insert->execute($time, $date, $description);
}

sub search {
    my ($self, $dbh, $description, $all) = @_;
    my $search;
    if( $all eq 1){
	$search = $dbh->prepare("SELECT `id` AS id, `time` AS time, `date` AS date, `description` AS description FROM appointment");	
    }
    else{
	$search = $dbh->prepare("SELECT `id` AS id, `time` AS time, `date` AS date, `description` AS description FROM appointment WHERE description LIKE '%$description%'");	
    }    
    $search->execute();
    my @results;    
    while (my $row = $search->fetchrow_hashref) {
	push @results, $row;
    }
    return @results;
}

1
