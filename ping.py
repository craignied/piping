#!/usr/bin/python

# This is code adapted from mconners' https://www.element14.com/community/community/stem-academy/blog/2014/12/21/ping-me
# Credit where credit is due

import time
import RPi.GPIO as GPIO
from socketIO_client import SocketIO, LoggingNamespace

# Use board based pin numbering
GPIO.setmode( GPIO.BOARD )

def ReadDistance( pin ):
   GPIO.setup( pin, GPIO.OUT )
   GPIO.output( pin, 0 )

   time.sleep( 0.000002 )

   #send trigger signal
   GPIO.output( pin, 1 )

   time.sleep( 0.000005 )

   GPIO.output( pin, 0 )

   GPIO.setup( pin, GPIO.IN )

   while GPIO.input( pin ) == 0:
      starttime = time.time()

   while GPIO.input( pin ) == 1:
      endtime = time.time()
      
   duration = endtime - starttime

   # Distance is defined as time/2 (there and back) * speed of sound 34000 cm/s 
   distance = duration * 34000 / 2
   return distance

while True:
   with SocketIO( 'localhost', 3000, LoggingNamespace ) as socketIO:
      distance = ReadDistance( 11 )
      socketIO.emit( 'python-message', "Distance to object is %s cm or %s inches" % ( distance, distance * .3937 ) )
      socketIO.wait( seconds = 1 )
