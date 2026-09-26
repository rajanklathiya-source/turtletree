import turtle

# Realistic Python Turtle Tree with Tapering Trunk & Leaf Foliage
t = turtle.Turtle()
screen = turtle.Screen()
screen.bgcolor("black")
screen.title("Realistic Python Turtle Tree")
t.speed(0)
t.shape("turtle")

# Fast rendering (turns off animation delay for instant drawing)
screen.tracer(0, 0)

def tree(i, pen_width):
    if i < 12:
        # Draw lush green foliage / leaves at branch tips
        t.color("#22c55e")
        t.begin_fill()
        t.circle(5)
        t.end_fill()
        return
    else:
        # Branch thickness tapers smoothly with depth
        t.pensize(max(1.2, pen_width))
        t.color("#8b5a2b")
        t.forward(i)

        # Orange fruit / blossom node at branch junction
        t.color("#f59e0b")
        t.begin_fill()
        t.circle(2.5)
        t.end_fill()
        t.color("#8b5a2b")

        # Left branch (28 degrees)
        t.left(28)
        tree(3 * i / 4, pen_width * 0.72)

        # Right branch (56 degrees)
        t.right(56)
        tree(3 * i / 4, pen_width * 0.72)

        # Return to junction
        t.left(28)
        t.backward(i)

# Position turtle at base of trunk
t.left(90)
t.penup()
t.backward(160)
t.pendown()

# Draw realistic tree (initial trunk length 110, base trunk thickness 11)
tree(110, 11)

# Update screen to reveal completed tree
screen.update()
turtle.done()
