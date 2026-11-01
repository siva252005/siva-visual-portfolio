def print_pattern(rows):
     for i in range(rows):
         for j in range(i + 1):
             print(chr(65 + i), end=" ")
             print() rows = int(input())
             print_pattern(rows)