#Poke the Dots v5
#This is a graphical game where two dots move around
#the screen bouncing off the edges
#score as seconds pass is displayed and dots move randomly
#on mouse click and start in random places
#game ends when dots collide

from uagame import Window
from pygame.time import Clock, get_ticks
from pygame import QUIT, Color, MOUSEBUTTONUP
from pygame.event import get as get_events
from pygame.draw import circle as draw_circle
from random import randint
from math import sqrt

def main():
    game = Game()
    game.play() 
        
class Game:
    #object in this class represents the complete game
    #window
    #frame_rate
    #close_selected
    #clock
    #small_dot
    #big_dot
    #score
    
    def __init__(self):
        #create window
        self._window = Window('Poke The Dots', 500, 400)
        self._adjust_window()
        self._clock = Clock()
        self._close_selected = False
        self._small_dot = Dot('red', [0,0], 30, [1,2], self._window)
        self._big_dot = Dot('blue', [200,100], 40, [2,1], self._window)
        self._small_dot.randomize()
        self._big_dot.randomize()
        self._frame_rate = 90
        self._score = 0     
        self._continue_game = True
        
    def _adjust_window(self):
        self._window.set_bg_color('black')
        self._window.set_font_name('couriernew')
        self._window.set_font_size(50)
        self._window.set_font_color('white')  
        
    def handle_events(self):
        event_list = get_events()
        for event in event_list:
            self.handle_one_event(event)
    
    def play(self):
    #   close window
        while not self._close_selected:
            #play frame
            self.handle_events()
            self.draw()
            self.update() 
        self._window.close()
    
    def handle_mouse_up(self):
        self._small_dot.randomize()
        self._big_dot.randomize()   
    
    def handle_one_event(self, event):
        if event.type == QUIT:
            self._close_selected = True
        elif self._continue_game and event.type == MOUSEBUTTONUP:
            self.handle_mouse_up()        
            
    def draw(self):
        self._window.clear()
        self._window.draw_string(('Score:' + str(self._score)), 0, 0)
        self._small_dot.draw()
        self._big_dot.draw()
        if not self._continue_game:
            self.game_over()
            
        self._window.update()    
    
    def update(self):
        if self._continue_game:
            self._small_dot.move()
            self._big_dot.move()
            self._clock.tick(self._frame_rate)
            #update score using time elapsed
            self._score = get_ticks() // 1000    
        #decide continue
        _distance = sqrt(pow((self._big_dot._center[0] - self._small_dot._center[0]), 2) 
        + pow((self._big_dot._center[1] - self._small_dot._center[1]), 2))
        if _distance <= self._small_dot._radius + self._big_dot._radius:
            self._continue_game = False
    
    def game_over(self):
        string = 'GAME OVER'
        font_color = self._small_dot.get_color()
        bg_color = self._big_dot.get_color()
        original_font_color = self._window.get_font_color()
        original_bg_color = self._window.get_bg_color()
        self._window.set_font_color(font_color)
        self._window.set_bg_color(bg_color)
        height = self._window.get_height() - self._window.get_font_height()
        self._window.draw_string(string, 0, height)
        self._window.set_font_color(original_font_color)
        self._window.set_bg_color(original_bg_color)

class Dot:
    #objects in this class represent dot attributes
    #center
    #color
    #radius
    #velocity
    #window
    
    def __init__(self, color, center, radius, velocity, window):
        self._color = color
        self._center = center
        self._radius = radius
        self._velocity = velocity
        self._window = window
        
    def draw(self):
        surface = self._window.get_surface()
        color = Color(self._color)
        draw_circle(surface, color, self._center, self._radius)  
        
    def randomize(self):
        size = (self._window.get_width(), self._window.get_height())
        for index in range(0, 2):
            self._center[index] = randint(self._radius, size[index] - self._radius)        
    
    def move(self):
        size_rd = [self._window.get_width(), self._window.get_height()]
        size_lu = [0, 1]
        for index in range(0, 2):
            #update centre at index
            self._center[index] = self._center[index] + self._velocity[index]
            if self._center[index] + self._radius >= size_rd[index] or self._center[index] - self._radius <= size_lu[index]:
                self._velocity[index] = - self._velocity[index]            
        
    def get_color(self):
        return self._color


main()
