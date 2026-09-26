import turtle

# Create turtle object
t = turtle.Turtle()

# Screen settings
screen = turtle.Screen()
screen.bgcolor("black")

t.pensize(2)
t.color("green")
t.left(90)
t.backward(100)
t.speed(0)          # Fastest speed
t.shape("turtle")

# Recursive function
def tree(i):
    if i < 10:
        return
    else:
        t.forward(i)
        t.color("orange")
        t.circle(2)
        t.color("brown")

        t.left(30)
        tree(3 * i / 4)

        t.right(60)
        tree(3 * i / 4)

        t.left(30)
        t.backward(i)

# Call function
tree(100)

turtle.done()
