# nutr-app
Created with CodeSandbox


This is the version of the app made on react, NOT react-native!!!

the methods to be created in order to interact with data are as follow:

def query_student by ID
/tells the database to check if the given ID is valid
  if valid pull the Student Data and open Student Page (individual per student)
  if not pop error message
  /
  ----
  
 def query_products by product_category
  /loads all products products for given category
   lists them as a one product per line
   /
   ----
  
def remove by product_name,product_id
  /removes temporary stored product name from array list
  finds the entry
  removes/
  
def complete-checkout by product_array
  /takes all products stored in array list (products)
  quesries database
  creates new entry in checkout table
  adds all products by ID
  /
  ***after this go to FinPage and complete check out***
