/* Consider the syntax:

f = function(x) { function(y) { return x**y; } };
f(when x => 2<=x && x<=3)(y) = y => x**(y+1);
console.log(f(2.1+i))(2); # 2.961+12.23i = (2.1+i)**(2+1)
console.log(f(4)(2))      # 16 = 4**2
*/
