# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Mauricio Mueller Explanation about refactoring

1. I used the library `jest` to write unit tests to cover the existing functionality and ensure that my refactor doesn't break it.
   1. Testing function without input
   1. Testing function with an existing partition key
   1. Testing function with a string input
   2. Testing function with a number input
   1. Testing function with partitionKey length is larger than 256
1. The constants TRIVIAL_PARTITION_KEY and MAX_PARTITION_KEY_LENGTH were moved outside the function to make them more visible and reusable throughout the module if needed. 
1. The generateHashValue function was extracted into a separate function to remove duplication and make the code more modular.
1. The generatePartitionKey function was extracted into a separate function to remove duplication and make the code more modular.
1. The original code had a series of nested if statements that were difficult to read and understand. The refactored code simplifies the logic by using a ternary operator to set the partitionKey value.
1. The refactored code removes an unnecessary check to convert candidate to a string. If candidate is already a string, the check is not needed.
1. The final if statement in the original code was checking the length of candidate and then re-hashing it if it was too long. In my refactored code, this logic is condensed into a single line using a ternary operator.