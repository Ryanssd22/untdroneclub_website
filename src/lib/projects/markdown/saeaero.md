# SAE Aero

SAE Aero Design is our flagship project and the club's main focus. We compete in the Advanced Class, the most technically demanding division of SAE Aero Design, which requires a full systems engineering approach spanning aerodynamics, mechanical design, electrical systems, and onboard computing. The Advanced Class emphasizes autonomy and precision payload delivery, pushing our team to design and build an aircraft capable of completing complex missions with minimal pilot input. This is where the club puts its most resources and most experienced members, and it represents the culmination of everything learned across our other projects.

## Aircraft Concept & Prototyping

To evaluate our aerodynamics, proportions, and overall configuration, we started with rapid desktop prototypes before committing to full-scale fabrication.

<img src="/project_photos/sae_aero/prototype.jpg" alt="Small-Scale Prototype Aircraft" class="w-full max-w-2xl rounded-lg shadow-md my-4">

* **Initial Scale Prototype:** Handheld 3D-printed prototype model showcasing the high-wing layout, fuselage profile, carbon fiber tail boom, and landing gear setup.

## CAD & Structural Design

The airframe is designed in SolidWorks to optimize aerodynamic efficiency, internal volume for electronics and payload, and structural rigidity.

<img src="/project_photos/sae_aero/stucture.png" alt="SolidWorks Airframe Assembly" class="w-full max-w-2xl rounded-lg shadow-md my-4">

* **Airframe Assembly:** SolidWorks CAD model (`SAEAeroPrototypeV4`) showing the streamlined fuselage, access canopy hatch, and high-lift airfoil wing geometry.

<img src="/project_photos/sae_aero/image.png" alt="CAD Detail - Tilt Mechanisms and Tail Boom" class="w-full max-w-2xl rounded-lg shadow-md my-4">

* **Mechanism Integration & Boom:** Detailed CAD model highlighting the wing-mounted tilt-rotor mechanisms, control surfaces, and the structural rear carbon fiber boom attachment.

## Tilt-Rotor Mechanism

For VTOL (Vertical Takeoff and Landing) capability, the aircraft employs tilting motor pods that transition between vertical lift and efficient forward flight.

<img src="/project_photos/sae_aero/tilt.jpg" alt="3D Printed Tilt-Rotor Mount" class="w-full max-w-2xl rounded-lg shadow-md my-4">

* **Tilt-Rotor Mount:** 3D-printed tilt mechanism and servo housing, contoured specifically to seat flush against the leading edge of the wing.

## 3D Printing & Airframe Fabrication

We utilize high-precision 3D printing to create lightweight internal rib structures and complex aerodynamic fairings.

<img src="/project_photos/sae_aero/wing.jpg" alt="3D Printing Wing Section" class="w-full max-w-2xl rounded-lg shadow-md my-4">

* **Wing Section Printing:** Bambu Lab 3D print of an airfoil segment showing the lightweight internal infill pattern designed for optimal stiffness-to-weight ratio.

<img src="/project_photos/sae_aero/IMG_9116.jpg" alt="Bambu Lab Print in Progress" class="w-full max-w-2xl rounded-lg shadow-md my-4">

* **Component Print:** In-progress vertical print of an airframe component in the Bambu Lab 3D printer.

<img src="/project_photos/sae_aero/IMG_9155.jpg" alt="Fuselage Spar Test Fit" class="w-full max-w-2xl rounded-lg shadow-md my-4">

* **Fuselage Spar Fitment:** 3D-printed forward fuselage section with carbon fiber structural spar rods inserted horizontally for load distribution and wing mounting.

## Power & Safety Systems

Safety and competition compliance require clean power distribution and fail-safe arming procedures.

<img src="/project_photos/sae_aero/arming.png" alt="XT60 Arming Loop Schematic" class="w-full max-w-2xl rounded-lg shadow-md my-4">

* **Arming Plug Schematic:** Wiring diagram for the external XT60 arming plug loop, allowing safe manual arming and disconnection of the main propulsion battery.

## Simulation & Autonomous Systems

Before flight testing, the aircraft, avionics, and autonomous computer vision systems are extensively tested in a Software-in-the-Loop (SITL) simulation stack.

<img src="/project_photos/sae_aero/sim.png" alt="Gazebo VTOL Simulation" class="w-full max-w-2xl rounded-lg shadow-md my-4">

* **Gazebo Airframe Simulation:** Simulation model in Gazebo used to test flight dynamics and VTOL transitions.

<img src="/project_photos/sae_aero/Screenshot_2026-11-07_163503.png" alt="Full SITL and Vision Pipeline" class="w-full max-w-2xl rounded-lg shadow-md my-4">

* **Autonomous Vision & Control Stack:** Multi-system SITL testing featuring Gazebo (`saeaero_field`), ROS 2 bridge with Foxglove Studio detecting ground AprilTags via the onboard camera feed, and QGroundControl managing mission flight modes.
