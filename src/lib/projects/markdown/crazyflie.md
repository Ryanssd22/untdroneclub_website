# Crazyflie

<video width="500" controls>
    <source src="/project_photos/crazyflie.mov">
</video>

## Autonomous Swarm Mapping

The Crazyflie project is focused on getting multiple small drones to work together and map an unknown space on their own.

We use **Crazyflie drones running ROS 2** to experiment with autonomous flight, sensing, and communication between multiple drones. The main goal is to eventually have a group of drones enter a room, explore it, and build a map without anyone manually controlling them.

## What We're Working On

Some of the main problems we're working through are:

* Getting multiple drones to coordinate without getting in each other's way
* Using onboard sensors to understand the surrounding environment
* Planning paths and navigating without manual control
* Sharing information between drones while they explore

## Why Crazyflie?

Crazyflies are small, relatively safe, and easy to test with indoors, which makes them a good platform for learning autonomous robotics.

They let us work on the software and coordination side of drones without needing to immediately deal with the size, cost, and risk of a larger aircraft.

A lot of what we learn here can later be applied to bigger drone projects.

## Goal

The end goal is to have a swarm of Crazyflie drones that can **autonomously explore and map an unfamiliar area together**.
