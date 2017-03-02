/**
 * Created by root on 22/12/16.
 */

/*

Functional Programming with javascript

Leonardo Ayala R.

Practice 1

 */


// Iterative function

/*function adder(ar)
{
    sum=0;

    for(var i=0; i< ar.length;i++)
    {
        sum+= ar[i];
    }
    return sum;
}*/



// Function that only add the number is not divisible for two

function adder(ar,filter)
{
    sum=0;

    for(var i=0; i< ar.length;i++)
    {
        if(!filter || filter(ar[i]))
            sum+= ar[i];
    }
    return sum;
}

function isOdd(n)
{
    return n % 2 ==1 ;
}

function isEven(n)
{
    return n % 2 == 0 ;
}


vector = [1,2,3,4,5]

console.log('suma total es: '+adder(vector,isOdd))
// if I want to print all the numbers in the arry:
console.log('all values total: '+ adder(vector,function(n){return true;})  )
// I can improve the clal funtion thai:
console.log('con solo un arg total is: '+adder(vector))





// Function that only add the number divisible for two

/*function adder(ar)
{
    sum=0;

    for(var i=0; i< ar.length;i++)
    {
        if(ar[i] % 2 == 0)
            sum+= ar[i];
    }
    return sum;
}*/


