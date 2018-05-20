#!/user/bin/perl

package DBConnection;

use strict;
use DBI;

sub new {
    my $class = shift;
    my $self = {};
    bless $self, $class;
    return $self;    
}

sub connect {
    my ($self, $db, $userid, $passwd) = @_;
    $self->{_db} = $db if defined($db);
    $self->{_userid} = $userid if defined($userid);
    $self->{_passwd} = $passwd if defined($passwd);
    $self->{_driver} = "SQLite";
    $self->{_dsn} = "DBI:$self->{_driver}:dbname=$self->{_db}";
    $self->{_dbh} = DBI->connect(
	$self->{_dsn},
	$self->{_userid},
	$self->{_passwd},
	{RaiseError=>1});

    if($self->{_dbh} == undef){
	die $DBI::errstr;
	return 0;
    }
    else{
	return $self->{_dbh};
    }
}

1
