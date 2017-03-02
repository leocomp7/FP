module Main (main) where

import FibModule
import ParImpar

hello = "Hello" ++ "World"
testPar n = ePar n
testImpar n = eImPar n
testFibo n  = fib n

main =   putStrLn hello

