module ParImpar where

ePar :: Int -> Bool

ePar n  | (mod n 2 == 0) = True
        | otherwise = False

eImPar :: Int -> Bool
eImPar n  | (mod n 2 == 0) = False
          | otherwise = True

