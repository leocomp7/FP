/**
 * Created by root on 22/12/16.
 */

var isOdd = function (n)
{
    return n % 2 == 1;
}
var isEven = function (n)
{
    return n % 2 == 0;
}

var vector = [1,2,3,4,5]
var sum=0;

vector.forEach(function(n)
    {
        if(this(n))
            sum+=n;
    },isOdd)


console.log('The foreach sum is: '+sum);
