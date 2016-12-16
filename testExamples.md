# Test mockup

(0,0) (0,1) (0,2)
(1,0) (1,1) (1,2)
(2,0) (2,1) (2,2)

## Sucess

### Feauture: x wins with top horizontal(lárétt) row
Given [Placed (0,0,x), Placed (0,1,x)]

When [Place (0,2,x)]

Then [x won]

### Feauture: x wins with middle horizontal(lárétt) row
Given [Placed (1,0,x), Placed (1,1,x)]

When [Place (1,2,x)]

Then [x won]

### Feauture: x wins with bottom horizontal(lárétt) row
Given [Placed (2,0,x), Placed (2,1,x)]

When [Place (2,2,x)]

Then [x won]

### Feauture: x wins with the first vertical(lóðrétt) row
Given [Placed (0,0,x), Placed (1,0,x)]

When [Place (2,0,x)]

Then [x won]

### Feauture: x wins with the second vertical(lóðrétt) row
Given [Placed (0,1,x), Placed (1,1,x)]

When [Place (2,1,x)]

Then [x won]

### Feauture: x wins with the third vertical(lóðrétt) row
Given [Placed (0,2,x), Placed (1,2,x)]

When [Place (2,2,x)]

Then [x won]

### Feauture: x wins with a cross from left to right
Given [Placed (0,0,x), Placed (1,1,x)]

When [Place (2,2,x)]

Then [x won]

### Feauture: x wins with a cross from right to left
Given [Placed (2,0,x), Placed (1,1,x)]

When [Place (0,2,x)]

Then [x won]

## Failure

### Feauture: 
Given [Placed (2,0,x), Placed (1,1,x)]

When [Place (1,0,x)]

Then [x didn´t win]

### Feauture: 
Given [Placed (0,0,x), Placed (1,0,x)]

When [Place (1,0,x)]

Then [x didn´t win]

