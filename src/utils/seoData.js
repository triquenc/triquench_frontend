const seoPages = [
  {
    slug: 'cnc-spindle-motor',
    title: 'Spindle Motors, CNC Accessories & Laser Parts | TriQuench India Pvt. Ltd.',
    description: 'Discover CNC spindle motors, VFD drives, servo motors, tool holders, laser accessories, and more at TriQuench India. High precision solutions for industrial and CNC needs.',
    keywords: 'CNC spindle motor, spindle servo motor, AC servo motor, CNC router accessories, VFD drive, fiber laser parts, tool holders, spindle bearings, CNC machine accessories, high speed spindle, water cooled spindle'
  },
  {
    slug: 'about',
    title: 'About TriQuench India | CNC Spindle Motor Manufacturer Since 2012',
    description: 'Learn about TriQuench India, a leading manufacturer of high-performance CNC spindle motors and industrial automation parts, delivering quality since 2012.',
    keywords: 'TriQuench India, CNC spindle manufacturer, about TriQuench, CNC motor company, machine accessories manufacturer India'
  },
  {
    slug: 'spindle-motor',
    title: 'High-Speed CNC Spindle Motors for Precision Applications | TQI',
    description: 'Explore our wide range of CNC spindle motors for routers, lathes, milling machines, woodworking, and metal cutting. High-speed, durable, and made in India.',
    keywords: 'CNC spindle motor, high speed spindle motor, ATC spindle, water cooled spindle, air cooled spindle, servo spindle motor, spindle motor for CNC router'
  },
  {
    slug: 'vfd-drive',
    title: 'VFD Drives for Spindle Motors & CNC Machines | TriQuench India',
    description: 'Shop precision-controlled VFD drives for 1/3 phase CNC motors. Find Delta VFD, inverter drives, and industrial motor controllers for efficient performance.',
    keywords: 'VFD for CNC, VFD drive for spindle motor, VFD controller, variable frequency drive CNC, Delta VFD, CNC router VFD, industrial VFD'
  },
  {
    slug: 'laser-parts',
    title: 'Fiber Laser Heads, Controllers, and Accessories | TriQuench India',
    description: 'Get fiber laser sources, Raytools BT240S, BT220 heads, CO2 laser controllers, and more. Industrial laser parts for precision cutting and marking.',
    keywords: 'Raytools laser head, fiber laser parts, CO2 laser controller, fiber laser source, BT240S 3000W, BT220 2000W, JPT fiber laser, laser cutting accessories'
  },
  {
    slug: 'tool-holder',
    title: 'CNC Tool Holders - BT40, ISO, ER Collet | CNC Machine Accessories',
    description: 'Browse premium tool holders for CNC routers and lathes. BT40, ISO tool holders, ER collet chucks, and spindle accessories available for high-precision work.',
    keywords: 'BT40 tool holder, ISO tool holder, ER collet spindle motor, CNC tool holders, spindle accessories, lathe spindle tools'
  },
  {
    slug: 'cnc-router-accessories',
    title: 'CNC Router Accessories & Spindle Motors | TriQuench India',
    description: 'Enhance your CNC router performance with high torque spindle motors, wood carving spindles, VFD drives, collets, and other essential accessories.',
    keywords: 'CNC router accessories, spindle for wood router, wood carving spindle, CNC router motor, spindle bearing, spindle tools'
  },
  {
    slug: 'contact',
    title: 'Contact TriQuench India Pvt. Ltd. | Spindle Motor & CNC Experts',
    description: 'Reach out to TriQuench India for expert guidance on CNC spindle motors, accessories, and laser components. Get a quote or ask us your technical queries.',
    keywords: 'Contact TriQuench India, spindle motor supplier, CNC accessories contact, fiber laser product support, CNC product inquiry'
  },
   {
    slug: 'planetary-gearbox',
    title: 'Planetary Gearbox for CNC Machines | Compact & High Torque Gearbox',
    description: 'Find planetary gearboxes designed specifically for CNC machines. High efficiency, low backlash, and compact size for precise motion control in industrial setups.',
    keywords: 'planetary gearbox for CNC machines, CNC gearbox, compact gearbox for CNC, high torque gearbox, CNC automation gearbox'
  },
  {
    slug: 'planetary-gearbox',
    title: 'High Torque Planetary Gearbox | Industrial Automation Gear Solutions',
    description: 'Discover high torque planetary gearboxes ideal for automation, robotics, and machine tools. Reliable, efficient, and built to withstand heavy-duty operations.',
    keywords: 'high torque planetary gearbox, industrial gearbox, automation gearbox, heavy duty planetary gearbox, power transmission gearbox'
  },
  {
    slug: 'planetary-gearbox',
    title: 'Inline Planetary Gearbox for Servo Motors | Precision Motion Control',
    description: 'Get inline planetary gearboxes engineered for servo motor systems. Achieve precision motion control with high accuracy and torque output.',
    keywords: 'inline planetary gearbox, planetary gearbox for servo motor, motion control gearbox, inline gear reducer, precision gearbox'
  },
  {
    slug: 'planetary-gearbox',
    title: 'Low Backlash Planetary Gearbox | Precision Gear Reducers for Automation',
    description: 'Shop low backlash planetary gearboxes for smooth and accurate motion. Perfect for robotics, CNC machines, and servo applications.',
    keywords: 'low backlash planetary gearbox, precision planetary gearbox, gear reducer, CNC gearbox, robotics gearbox'
  },
  {
    slug: 'planetary-gearbox',
    title: 'Compact Planetary Gearbox | Space-Saving Industrial Gearbox',
    description: 'Discover compact planetary gearboxes designed to save space without compromising torque and efficiency. Suitable for compact machinery.',
    keywords: 'compact planetary gearbox, small gearbox, mini planetary gearbox, space-saving gearbox, efficient industrial gearbox'
  },
  {
    slug: 'planetary-gearbox',
    title: 'Planetary Gear Reducer for Heavy Machinery | Durable Power Transmission',
    description: 'Planetary gear reducers built for heavy machinery applications. Ensure robust power transmission and long-term reliability.',
    keywords: 'planetary gear reducer, heavy machinery gearbox, durable gearbox, industrial gear reducer, planetary drive system'
  },
  {
    slug: 'planetary-gearbox',
    title: 'Custom Planetary Gearbox Manufacturer in India | Tailored Gear Solutions',
    description: 'Looking for custom planetary gearboxes? We manufacture tailored gear systems to meet your industrial and automation needs in India.',
    keywords: 'custom planetary gearbox, gearbox manufacturer India, custom gear solutions, OEM gearbox, gearbox India'
  },
  {
    slug: 'planetary-gearbox',
    title: 'Best Planetary Gearbox for Industrial Use | Reliable Performance Guaranteed',
    description: 'Explore the best planetary gearboxes for industrial use. Trusted by manufacturers for performance, durability, and ease of integration.',
    keywords: 'best planetary gearbox, industrial gearbox, reliable planetary gearbox, top planetary gearbox, CNC gear system'
  },
  {
    slug: 'planetary-gearbox',
    title: 'Right Angle Planetary Gearbox | Space-Efficient Motion Transfer',
    description: 'Right-angle planetary gearboxes designed for tight spaces and angular motion. Perfect for complex machine layouts.',
    keywords: 'right angle planetary gearbox, angular gearbox, space-saving gearbox, L-shaped planetary gearbox, motion gearbox'
  },
  {
    slug: 'planetary-gearbox',
    title: 'Planetary Gearbox for 3D Printers | Smooth & Accurate Operation',
    description: 'Get planetary gearboxes optimized for 3D printers, offering low vibration and smooth, precise performance.',
    keywords: 'planetary gearbox for 3D printers, 3D printer gearbox, compact gearbox for 3D machines, precision gear reducer'
  },
  {
    slug: 'planetary-gearbox',
    title: 'High Efficiency Planetary Gearbox | Energy-Saving Gear Drive',
    description: 'Upgrade to high-efficiency planetary gearboxes that reduce energy loss and maximize performance in automated systems.',
    keywords: 'high efficiency planetary gearbox, energy-saving gearbox, efficient industrial gearbox, gear drive system'
  },
  {
    slug: 'planetary-gearbox',
    title: 'CNC Planetary Gearbox Supplier in Gujarat | Precision Gear Solutions',
    description: 'Leading supplier of CNC planetary gearboxes in Gujarat. Trusted by OEMs and machine builders for precision and durability.',
    keywords: 'CNC planetary gearbox Gujarat, gearbox supplier Gujarat, CNC gear system, planetary gearbox India'
  },
  {
    slug: 'planetary-gearbox',
    title: 'Servo Planetary Gearbox for Motion Control | Industrial Accuracy Gear',
    description: 'Get servo planetary gearboxes designed for high-accuracy motion control systems. Ideal for robotics and automation.',
    keywords: 'servo planetary gearbox, motion control gearbox, servo gear reducer, precise gearbox, automation gearbox'
  },
  {
    slug: 'planetary-gearbox',
    title: 'Industrial Planetary Gearbox for Automation | Durable Gear Systems',
    description: 'Buy industrial-grade planetary gearboxes for automation systems. Built to perform under continuous industrial operations.',
    keywords: 'industrial planetary gearbox, automation gearbox, durable gearbox, heavy-duty planetary gearbox, gearbox for automation'
  },
  {
    slug: 'planetary-gearbox',
    title: 'Planetary Gearbox for Electric Vehicles | Compact & Efficient Drive',
    description: 'Explore compact and efficient planetary gearboxes for electric vehicle drive systems. High torque and low maintenance.',
    keywords: 'planetary gearbox for EV, EV gearbox, electric vehicle planetary gearbox, compact gearbox, efficient gearbox'
  },
  {
    slug: 'planetary-gearbox',
    title: 'Planetary Gear System with Low Noise | Smooth Gear Transmission',
    description: 'Low noise planetary gear systems for smooth and silent motion in industrial environments. Ideal for sensitive operations.',
    keywords: 'low noise planetary gearbox, silent gearbox, smooth gear transmission, quiet gear system'
  },
  {
    slug: 'planetary-gearbox',
    title: 'Planetary Gearbox Distributor in Ahmedabad | Trusted CNC Gear Supplier',
    description: 'Authorized distributor of planetary gearboxes in Ahmedabad. Supplying to CNC, automation, and mechanical industries.',
    keywords: 'planetary gearbox distributor Ahmedabad, gearbox supplier Ahmedabad, Ahmedabad CNC gearbox, Gujarat gearbox'
  },
  {
    slug: 'planetary-gearbox',
    title: 'Planetary Gearbox for High-Speed Spindles | Precision & Power',
    description: 'Planetary gearboxes made for high-speed spindle motors. Achieve reliable torque at top RPMs for advanced machines.',
    keywords: 'planetary gearbox for spindle motor, high speed gearbox, spindle motor gearbox, precision gear system'
  },
 {
  slug: 'controller',
  title: 'NK105 G2 & G3 CNC Controller | High-Precision Motion Control',
  description: 'Upgrade your CNC machines with NK105 G2 and G3 controllers for high-precision motion control, easy setup, and long-lasting durability in industrial applications.',
  keywords: 'NK105 G2 controller, NK105 G3 controller, CNC router motion controller, durable CNC controller, precision NK105 motion control, long life CNC controller, NK105 G2 vs G3, affordable NK105 controller price'
},
  {
  slug: 'controller-nk105-g2',
  title: 'Controller NK105 G2 | High-Precision CNC Motion Control',
  description: 'Upgrade your CNC setup with the NK105 G2 controller, offering precise and stable motion control for woodworking, milling, and other CNC machines.',
  keywords: 'Controller NK105 G2, NK105 G2 CNC controller, high-precision CNC control, durable CNC controller, motion control NK105 G2'
}
,
{
  slug: 'controller-nk105-g3',
  title: 'Controller NK105 G3 | Durable Motion Control for CNC Machines',
  description: 'Get accurate motion control with the NK105 G3 CNC controller, designed for woodworking and milling machines with long-term durability and easy setup.',
  keywords: 'Controller NK105 G3, NK105 G3 CNC controller, CNC motion control, durable CNC controller, NK105 G3 for woodworking machines'
}
, 
{
  slug: 'nk105-cnc-controller',
  title: 'NK105 CNC Controller | Precision & Durable CNC Motion Control',
  description: 'Discover the NK105 CNC controller for smooth, stable motion control in woodworking, milling, and spindle motor machines.',
  keywords: 'NK105 CNC controller, precision CNC control, durable CNC controller, NK105 motion control system'
}
,
{
  slug: 'nk105-motion-controller',
  title: 'NK105 Motion Controller | Reliable Motion Control for CNC',
  description: 'Power your CNC machines with the NK105 motion controller, built for accuracy, stability, and long-term industrial use.',
  keywords: 'NK105 motion controller, CNC motion control, accurate CNC controller, long-life motion controller'
}
, 
{
  slug: 'cnc-router-accessories',
  title: 'CNC Router Controller NK105 | High-Performance CNC Motion',
  description: 'Upgrade your CNC router with the NK105 controller for reliable, smooth, and high-performance motion control.',
  keywords: 'CNC router controller NK105, NK105 controller for CNC routers, precision router motion control, stable CNC controller'
},
{
  slug: 'cnc-router-accessories',
  title: 'NK105 G2 CNC Controller Features | Precision Motion Control',
  description: 'Discover all key features of the NK105 G2 CNC controller, including high-precision motion control and robust industrial design.',
  keywords: 'NK105 G2 CNC controller features, NK105 G2 controller specs, high-precision CNC controller, durable CNC control system'
}, 
{
  slug: 'cnc-router-accessories',
  title: 'NK105 G3 Motion Control System | Durable CNC Motion Solution',
  description: 'Upgrade your CNC machines with the NK105 G3 motion control system for stable, precise control and long-term industrial performance.',
  keywords: 'NK105 G3 motion control system, durable CNC motion control, high-precision CNC control system, NK105 G3 controller'
},
{
  slug: 'cnc-router-accessories',
  title: 'CNC Controller NK105 for Woodworking Machines | Precision Routing',
  description: 'Get smooth, stable CNC control for woodworking machines with the NK105 controller, built for accurate carving, milling, and routing.',
  keywords: 'CNC controller NK105 for woodworking machines, NK105 woodworking controller, stable CNC woodworking control, accurate CNC router control'
},
{
  slug: 'cnc-router-accessories',
  title: 'Controller NK105 G2 vs G3 | Detailed Comparison',
  description: 'Compare the NK105 G2 and G3 controllers to choose the right CNC control system for your machines with detailed features and specs.',
  keywords: 'Controller NK105 G2 vs G3 comparison, NK105 G2 vs G3 features, NK105 G2 vs G3 differences, CNC controller comparison'
}, 
{
  slug: 'cnc-router-accessories',
  title: 'NK105 Controller for Spindle Motor Machines | Reliable CNC Control',
  description: 'Ensure precision and stability for spindle motor machines with the NK105 CNC controller, built for high-performance industrial use.',
  keywords: 'NK105 controller for spindle motor machines, CNC spindle motor controller, stable spindle motion control, durable CNC control'
},
{
    slug: 'cnc-router-accessories',
    title: 'Ball Screw for CNC Wood Router | High Precision Motion',
    description: 'Upgrade your CNC wood router with high-quality ball screws designed for smooth, precise, and backlash-free motion.',
    keywords: 'Ball screw for CNC wood router, CNC ball screw system, wood router motion control, high precision ball screw'
  },
  {
    slug: 'cnc-router-accessories',
    title: 'Linear Guideways for CNC Router | Smooth & Accurate',
    description: 'Boost your CNC router performance with durable linear guideways that ensure high accuracy and smooth linear motion.',
    keywords: 'Linear guideways for CNC router, CNC linear motion system, precision guide rails, smooth motion CNC parts'
  },
  {
    slug: 'cnc-router-accessories',
    title: 'Hiwin LM Guide for Wood Router | Precision CNC Motion',
    description: 'Install Hiwin LM guides on your CNC wood router for unmatched precision, smooth travel, and durability.',
    keywords: 'Hiwin LM guide for wood router, Hiwin linear guideways, CNC guide rails for woodworking, wood router LM guide'
  },
  {
    slug: 'cnc-router-accessories',
    title: 'Rack and Pinion for CNC Woodworking Machine | Heavy-Duty Performance',
    description: 'Enhance the strength and speed of your CNC woodworking machine with premium rack and pinion drive systems.',
    keywords: 'Rack and pinion for CNC woodworking machine, CNC router drive system, woodworking CNC rack gear'
  },
  {
    slug: 'cnc-router-accessories',
    title: 'Tool Holders for CNC Wood Machines | Secure & Precise Tooling',
    description: 'Shop durable tool holders for CNC wood machines for accurate and stable cutting performance in every operation.',
    keywords: 'Tool holders for CNC wood machines, CNC spindle tool holders, router bit holders, woodworking CNC tools'
  },
  {
    slug: 'cnc-router-accessories',
    title: 'VFD Drive for CNC Wood Router | Speed Control Made Easy',
    description: 'Control spindle speeds efficiently with a reliable VFD drive made specifically for CNC wood routers.',
    keywords: 'VFD drive for CNC wood router, CNC spindle speed controller, wood router VFD, inverter drive CNC'
  },
  {
    slug: 'cnc-router-accessories',
    title: 'Spindle Driver for CNC Router | Smooth Spindle Operation',
    description: 'Get consistent power and control with a spindle driver for your CNC router, perfect for high-speed woodworking.',
    keywords: 'Spindle driver for CNC router, CNC motor driver, wood router spindle controller, stable spindle operation'
  },
  {
    slug: 'cnc-router-accessories',
    title: 'CNC Control Panel for Wood Router | Complete Machine Command',
    description: 'Install an advanced CNC control panel to manage all wood router functions with precision and ease.',
    keywords: 'CNC control panel for wood router, CNC router operator panel, machine control box, woodworking control panel'
  },
  {
    slug: 'cnc-router-accessories',
    title: 'Complete CNC Router Accessories Kit | One-Stop CNC Upgrade',
    description: 'Get everything you need in one place with a complete CNC router accessories kit including spindle, VFD, tools, and more.',
    keywords: 'Complete CNC router accessories kit, CNC upgrade kit, wood router accessories, all-in-one CNC router parts'
  }, 
    {
    slug: 'cnc-router-accessories',
    title: 'CNC Pattern Making Machine Spindle | High-Torque Motor by TQI',
    description: 'Buy high-speed, heavy-duty spindle motors for CNC pattern making machines. Ideal for foundry and wood pattern work. Air & water cooled options available.',
    keywords: 'CNC Pattern Making Machine Spindle, spindle motor for CNC pattern machine, high torque CNC spindle, CNC spindle for foundry pattern, wood pattern spindle motor'
  }, 

  {
  slug: 'cnc-router-accessories',
  title: 'Spindle for CNC Pattern Router | Precision Cutting with TQI Motors',
  description: 'Explore high-performance spindles for CNC pattern routers, designed for wood and foundry applications. Achieve accurate and smooth pattern cutting with TQI.',
  keywords: 'Spindle for CNC Pattern Router, CNC router spindle motor, high torque spindle for pattern making, spindle for foundry CNC, wood pattern spindle motor'
}, 
{
  slug: 'cnc-router-accessories',
  title: 'Spindle for CNC Pattern Router | High-Performance CNC Spindle by TQI',
  description: 'Get the best spindle for CNC pattern router machines. Ideal for wood and foundry pattern making with high torque, precision, and durability. Air & water cooled options available.',
  keywords: 'Spindle for CNC Pattern Router, CNC router spindle motor, pattern making spindle, high torque CNC spindle, wood pattern spindle, foundry CNC spindle'
},
{
  slug: 'cnc-router-accessories',
  title: 'CNC Spindle Supplier in India | High-Quality Spindle Motors by TQI',
  description: 'Trusted CNC spindle supplier in India offering high-performance spindle motors for routers, milling, and pattern making. Fast delivery and reliable support.',
  keywords: 'CNC Spindle Supplier India, spindle motor manufacturer India, CNC router spindle supplier, high torque spindle India, TQI spindle motors'
}, 
{
  slug: 'cnc-router-accessories',
  title: 'Direct Drive Spindle for CNC Routers | High-Speed Precision by TQI',
  description: 'Discover high-performance direct drive spindles for CNC routers. Designed for precision, low vibration, and high RPM. Ideal for woodworking and pattern making.',
  keywords: 'Direct Drive Spindle for CNC Routers, CNC router spindle motor, high speed spindle, low vibration spindle, direct drive CNC spindle, TQI spindle motors'
},
{
  slug: 'cnc-router-accessories',
  title: 'VFD Spindle for CNC Pattern Machine | Precision Control with TQI Spindles',
  description: 'Enhance your CNC pattern machine with a VFD spindle for smooth speed control and precision cutting. Ideal for wood and foundry pattern applications.',
  keywords: 'VFD Spindle for CNC Pattern Machine, variable frequency spindle motor, CNC pattern spindle, precision spindle control, TQI spindle for CNC router'
},
{
  slug: 'cnc-router-accessories',
  title: 'Pattern Prototyping Spindle | High-Precision CNC Spindles by TQI',
  description: 'Discover high-precision spindles designed for pattern prototyping. Ideal for CNC applications in wood, foundry, and mold pattern development.',
  keywords: 'Pattern Prototyping Spindle, CNC spindle for prototyping, high precision spindle, spindle motor for pattern making, TQI CNC spindle'
}, 
{
  slug: 'cnc-router-accessories',
  title: 'CNC Router Motor for Pattern Making | Powerful & Precise by TQI',
  description: 'Explore high-performance CNC router motors for pattern making. Designed for precision, durability, and smooth operation in wood and foundry applications.',
  keywords: 'CNC Router Motor for Pattern Making, pattern making spindle motor, CNC motor for wood patterns, high torque router motor, TQI CNC spindle'
},

{
  slug: 'cnc-router-accessories',
  title: 'High RPM CNC Spindle for Mold Patterns | Precision Spindle by TQI',
  description: 'Get high RPM CNC spindles designed for mold pattern machining. Ideal for precision cutting in foundry and industrial pattern making applications.',
  keywords: 'High RPM CNC Spindle for Mold Patterns, CNC spindle for mold making, high speed spindle motor, precision spindle for patterns, TQI CNC spindle'
},
{
  slug: 'cnc-router-accessories',
  title: 'Wood Pattern Making Spindle Motor | Durable CNC Spindles by TQI',
  description: 'Shop high-performance spindle motors for wood pattern making. Engineered for durability, precision, and smooth operation in CNC router applications.',
  keywords: 'Wood Pattern Making Spindle Motor, CNC spindle for wood pattern, durable spindle motor, high torque wood router spindle, TQI CNC spindle motor'
},

{
  slug: 'cnc-router-accessories',
  title: 'Pattern Making Router Spindle Motor | High-Performance CNC Spindle by TQI',
  description: 'Find precision-engineered router spindle motors for CNC pattern making. Ideal for wood, mold, and foundry pattern applications with high speed and torque.',
  keywords: 'Pattern Making Router Spindle Motor, CNC router spindle for pattern making, high torque spindle motor, wood pattern CNC spindle, TQI spindle motor'
},

{
  slug: 'cnc-router-accessories',
  title: 'Spindle for 3D Pattern CNC Machine | High Precision Spindles by TQI',
  description: 'Discover high-precision spindles for 3D pattern CNC machines. Perfect for complex mold and wood pattern applications requiring accuracy and performance.',
  keywords: 'Spindle for 3D Pattern CNC Machine, 3D CNC spindle motor, high precision spindle, CNC spindle for mold patterns, TQI CNC router spindle'
},
{
  slug: 'cnc-router-accessories',
  title: 'Servo Spindle Motor for CNC Pattern Cutter | High Torque by TQI',
  description: 'Get high-performance servo spindle motors for CNC pattern cutters. Engineered for precision, speed, and durability in wood and mold pattern applications.',
  keywords: 'Servo Spindle Motor for CNC Pattern Cutter, CNC servo spindle, high torque spindle motor, precision spindle for pattern making, TQI servo spindle motor'
},

{
  slug: 'cnc-router-accessories',
  title: 'Precision Spindle for Wood & Aluminum Pattern Milling | TQI CNC Spindles',
  description: 'Shop high-precision CNC spindles for wood and aluminum pattern milling. Designed for accuracy, durability, and smooth performance in industrial applications.',
  keywords: 'Precision Spindle for Wood & Aluminum Pattern Milling, CNC spindle for wood and aluminum, high accuracy spindle motor, pattern milling spindle, TQI CNC spindle'
},

{
  slug: 'cnc-router-accessories',
  title: 'ATC Spindle Motor for CNC Pattern Machine | Automatic Tool Change by TQI',
  description: 'Upgrade your CNC pattern machine with an ATC spindle motor for fast and precise automatic tool changes. Ideal for pattern making and mold applications.',
  keywords: 'ATC Spindle Motor for CNC Pattern Machine, automatic tool change spindle, CNC spindle motor with ATC, pattern making spindle, TQI ATC spindle motor'
},
{
  slug: 'cnc-router-accessories',
  title: 'ISO 30 Spindle for Pattern Router Machine | High-Speed CNC Spindle by TQI',
  description: 'Explore ISO 30 spindle motors for pattern router machines. Designed for precision, durability, and high-speed machining in wood and mold pattern applications.',
  keywords: 'ISO 30 Spindle for Pattern Router Machine, ISO30 CNC spindle, high speed spindle motor, CNC spindle for pattern making, TQI spindle motor'
},

{
  slug: 'cnc-router-accessories',
  title: 'Water Cooled Spindle for Industrial Pattern Making | High Efficiency by TQI',
  description: 'Discover water cooled spindle motors designed for industrial pattern making. Ensure long-lasting performance with efficient cooling and high-speed precision.',
  keywords: 'Water Cooled Spindle for Industrial Pattern Making, industrial CNC spindle, water cooled spindle motor, high performance spindle, TQI spindle for pattern making'
}, 
{
  slug: 'spindle-servo-motor',
  title: 'CNC Spindle Motor | Servo Spindle Motor',
  description: 'Discover water cooled spindle motors designed for industrial pattern making. Ensure long-lasting performance with efficient cooling and high-speed precision.',
  keywords: 'Water Cooled Spindle for Industrial Pattern Making, industrial CNC spindle, water cooled spindle motor, high performance spindle, TQI spindle for pattern making'
},
{
  slug: 'cnc-spindle-motor',
  title: '6000 RPM Saw Spindle Motor | CNC Wood & Panel Cutting',
  description: 'High-performance 6000 RPM saw spindle motor ideal for CNC wood cutting, panel saws, and aluminum applications. Durable, efficient, and built for precision cutting tasks.',
  keywords: '6000 RPM saw spindle motor, CNC saw spindle motor, spindle motor for wood cutting, high speed saw blade spindle, TQI 6000 rpm spindle for panel saw, aluminum cutting spindle motor'
},
{

  slug: 'cnc-spindle-motor',
  title: 'Saw Blade Spindle Motor | High Torque CNC Spindle',
  description: 'Explore high-torque saw blade spindle motors for CNC applications. Ideal for wood, aluminum, and panel cutting with smooth performance and long-lasting durability.',
  keywords: 'Saw blade spindle motor, CNC saw spindle, high torque spindle motor, spindle for wood cutting, TQI saw blade spindle, circular saw spindle motor, industrial cutting spindle'
},
{
  slug: 'cnc-spindle-motor',
  title: 'High Power Saw Spindle for CNC | Heavy-Duty Cutting Motor',
  description: 'Get high power saw spindles for CNC machines designed for demanding cutting applications. Ideal for industrial wood, panel, and aluminum cutting with consistent high-speed output.',
  keywords: 'High power saw spindle for CNC, heavy-duty spindle motor, CNC cutting spindle, industrial saw spindle, high torque CNC spindle, TQI spindle motor for CNC saw'
},
 {
    slug: 'cnc-spindle-motor',
    title: 'Cnc Spindle Motor | High Performance CNC Spindle Motor',
    description: 'Find top-quality cnc spindle motor for your CNC applications. Suitable for wood, metal, and industrial machining with reliable performance and durability.',
    keywords: 'cnc spindle motor, CNC spindle, CNC router motor, high-speed spindle, industrial spindle motor, TQI cnc spindle motor'
  },
  {
    slug: 'cnc-spindle-motor',
    title: 'Cnc Router Spindle | High Performance CNC Spindle Motor',
    description: 'Find top-quality cnc router spindle for your CNC applications. Suitable for wood, metal, and industrial machining with reliable performance and durability.',
    keywords: 'cnc router spindle, CNC spindle, CNC router motor, high-speed spindle, industrial spindle motor, TQI cnc router spindle'
  },
  {
    slug: 'cnc-spindle-motor',
    title: 'Water-Cooled Spindle | High Performance CNC Spindle Motor',
    description: 'Find top-quality water-cooled spindle for your CNC applications. Suitable for wood, metal, and industrial machining with reliable performance and durability.',
    keywords: 'water-cooled spindle, CNC spindle, CNC router motor, high-speed spindle, industrial spindle motor, TQI water-cooled spindle'
  },
  {
    slug: 'cnc-spindle-motor',
    title: 'Air-Cooled Spindle Motor | High Performance CNC Spindle Motor',
    description: 'Find top-quality air-cooled spindle motor for your CNC applications. Suitable for wood, metal, and industrial machining with reliable performance and durability.',
    keywords: 'air-cooled spindle motor, CNC spindle, CNC router motor, high-speed spindle, industrial spindle motor, TQI air-cooled spindle motor'
  },
  {
    slug: 'cnc-spindle-motor',
    title: '2.2Kw Spindle Motor | High Performance CNC Spindle Motor',
    description: 'Find top-quality 2.2kw spindle motor for your CNC applications. Suitable for wood, metal, and industrial machining with reliable performance and durability.',
    keywords: '2.2kw spindle motor, CNC spindle, CNC router motor, high-speed spindle, industrial spindle motor, TQI 2.2kw spindle motor'
  },
  {
    slug: 'cnc-spindle-motor',
    title: '3.7 Kw Cnc Spindle | High Performance CNC Spindle Motor',
    description: 'Find top-quality 3.7 kw cnc spindle for your CNC applications. Suitable for wood, metal, and industrial machining with reliable performance and durability.',
    keywords: '3.7 kw cnc spindle, CNC spindle, CNC router motor, high-speed spindle, industrial spindle motor, TQI 3.7 kw cnc spindle'
  },
  {
    slug: 'cnc-spindle-motor',
    title: 'Servo Spindle Motor | High Performance CNC Spindle Motor',
    description: 'Find top-quality servo spindle motor for your CNC applications. Suitable for wood, metal, and industrial machining with reliable performance and durability.',
    keywords: 'servo spindle motor, CNC spindle, CNC router motor, high-speed spindle, industrial spindle motor, TQI servo spindle motor'
  },
  {
    slug: 'cnc-spindle-motor',
    title: 'Atc Spindle Motor | High Performance CNC Spindle Motor',
    description: 'Find top-quality atc spindle motor for your CNC applications. Suitable for wood, metal, and industrial machining with reliable performance and durability.',
    keywords: 'atc spindle motor, CNC spindle, CNC router motor, high-speed spindle, industrial spindle motor, TQI atc spindle motor'
  },
  {
    slug: 'cnc-spindle-motor',
    title: 'Best Cnc Spindle Motor For Wood | High Performance CNC Spindle Motor',
    description: 'Find top-quality best cnc spindle motor for wood for your CNC applications. Suitable for wood, metal, and industrial machining with reliable performance and durability.',
    keywords: 'best cnc spindle motor for wood, CNC spindle, CNC router motor, high-speed spindle, industrial spindle motor, TQI best cnc spindle motor for wood'
  },
  {
    slug: 'cnc-spindle-motor',
    title: '7.5 Kw Cnc Spindle Motor | High Performance CNC Spindle Motor',
    description: 'Find top-quality 7.5 kw cnc spindle motor for your CNC applications. Suitable for wood, metal, and industrial machining with reliable performance and durability.',
    keywords: '7.5 kw cnc spindle motor, CNC spindle, CNC router motor, high-speed spindle, industrial spindle motor, TQI 7.5 kw cnc spindle motor'
  },
  {
    slug: 'cnc-spindle-motor',
    title: 'Buy Cnc Spindle Motor India | High Performance CNC Spindle Motor',
    description: 'Find top-quality buy cnc spindle motor india for your CNC applications. Suitable for wood, metal, and industrial machining with reliable performance and durability.',
    keywords: 'buy cnc spindle motor india, CNC spindle, CNC router motor, high-speed spindle, industrial spindle motor, TQI buy cnc spindle motor india'
  },
  {
    slug: 'cnc-spindle-motor',
    title: '3 Phase Cnc Spindle 220V | High Performance CNC Spindle Motor',
    description: 'Find top-quality 3 phase cnc spindle 220v for your CNC applications. Suitable for wood, metal, and industrial machining with reliable performance and durability.',
    keywords: '3 phase cnc spindle 220v, CNC spindle, CNC router motor, high-speed spindle, industrial spindle motor, TQI 3 phase cnc spindle 220v'
  },
  {
    slug: 'cnc-spindle-motor',
    title: 'Er20 Cnc Spindle Motor Kit | High Performance CNC Spindle Motor',
    description: 'Find top-quality er20 cnc spindle motor kit for your CNC applications. Suitable for wood, metal, and industrial machining with reliable performance and durability.',
    keywords: 'er20 cnc spindle motor kit, CNC spindle, CNC router motor, high-speed spindle, industrial spindle motor, TQI er20 cnc spindle motor kit'
  },
  {
    slug: 'cnc-spindle-motor',
    title: 'Cnc Spindle Motor With Vfd | High Performance CNC Spindle Motor',
    description: 'Find top-quality cnc spindle motor with vfd for your CNC applications. Suitable for wood, metal, and industrial machining with reliable performance and durability.',
    keywords: 'cnc spindle motor with vfd, CNC spindle, CNC router motor, high-speed spindle, industrial spindle motor, TQI cnc spindle motor with vfd'
  },
  {
    slug: 'cnc-spindle-motor',
    title: 'Cnc Spindle Motor Manufacturers In India | High Performance CNC Spindle Motor',
    description: 'Find top-quality cnc spindle motor manufacturers in india for your CNC applications. Suitable for wood, metal, and industrial machining with reliable performance and durability.',
    keywords: 'cnc spindle motor manufacturers in india, CNC spindle, CNC router motor, high-speed spindle, industrial spindle motor, TQI cnc spindle motor manufacturers in india'
  },
  {
    slug: 'cnc-spindle-motor',
    title: 'Cnc Spindle Motor Supplier Ahmedabad | High Performance CNC Spindle Motor',
    description: 'Find top-quality cnc spindle motor supplier ahmedabad for your CNC applications. Suitable for wood, metal, and industrial machining with reliable performance and durability.',
    keywords: 'cnc spindle motor supplier ahmedabad, CNC spindle, CNC router motor, high-speed spindle, industrial spindle motor, TQI cnc spindle motor supplier ahmedabad'
  },
  {
    slug: 'cnc-spindle-motor',
    title: 'Cnc Router Spindle Price In India | High Performance CNC Spindle Motor',
    description: 'Find top-quality cnc router spindle price in india for your CNC applications. Suitable for wood, metal, and industrial machining with reliable performance and durability.',
    keywords: 'cnc router spindle price in india, CNC spindle, CNC router motor, high-speed spindle, industrial spindle motor, TQI cnc router spindle price in india'
  },
  {
    slug: 'cnc-spindle-motor',
    title: 'High-Speed Spindle Motor 24000 Rpm | High Performance CNC Spindle Motor',
    description: 'Find top-quality high-speed spindle motor 24000 rpm for your CNC applications. Suitable for wood, metal, and industrial machining with reliable performance and durability.',
    keywords: 'high-speed spindle motor 24000 rpm, CNC spindle, CNC router motor, high-speed spindle, industrial spindle motor, TQI high-speed spindle motor 24000 rpm'
  },
  {
    slug: 'cnc-spindle-motor',
    title: 'High Torque Spindle Motor | High Performance CNC Spindle Motor',
    description: 'Find top-quality high torque spindle motor for your CNC applications. Suitable for wood, metal, and industrial machining with reliable performance and durability.',
    keywords: 'high torque spindle motor, CNC spindle, CNC router motor, high-speed spindle, industrial spindle motor, TQI high torque spindle motor'
  },
  {
    slug: 'cnc-spindle-motor',
    title: 'Low Noise Cnc Spindle | High Performance CNC Spindle Motor',
    description: 'Find top-quality low noise cnc spindle for your CNC applications. Suitable for wood, metal, and industrial machining with reliable performance and durability.',
    keywords: 'low noise cnc spindle, CNC spindle, CNC router motor, high-speed spindle, industrial spindle motor, TQI low noise cnc spindle'
  },

  {
    slug: 'cnc-spindle-motor',
    title: 'Low Noise CNC Spindle | High Performance CNC Spindle Motor',
    description: 'Find top-quality low noise cnc spindle for your CNC applications. Suitable for wood, metal, and industrial machining with reliable performance and durability.',
    keywords: 'low noise cnc spindle, CNC spindle, CNC router motor, high-speed spindle, industrial spindle motor, TQI low noise cnc spindle'
  },
  {
    slug: 'high-speed-spindle',
    title: 'High-Speed Spindle for CNC Machines | Precision Performance',
    description: 'Discover high-speed spindles ideal for CNC routers, engravers, and cutting machines. Enhanced accuracy and smooth operation at top RPMs.',
    keywords: 'high-speed spindle motor, CNC spindle motor, precision spindle, fast RPM CNC spindle, router spindle'
  },
  {
    slug: 'woodworking-spindle',
    title: 'CNC Spindle for Woodworking | Durable & Accurate Spindle Solutions',
    description: 'Explore premium woodworking spindle motors designed for CNC routers. Reliable, vibration-free, and long-lasting.',
    keywords: 'woodworking spindle motor, CNC spindle for wood, wood router spindle, low vibration spindle'
  },
  {
    slug: 'water-cooled-spindle',
    title: 'Water Cooled CNC Spindle | Quiet & Efficient Spindle Motor',
    description: 'Efficient water-cooled spindle for silent and continuous operation. Perfect for long-duration CNC cutting and engraving tasks.',
    keywords: 'water cooled CNC spindle, quiet spindle motor, 2.2kw spindle, efficient spindle cooling'
  },
  {
    slug: 'air-cooled-spindle',
    title: 'Air Cooled CNC Spindle | Hassle-Free Cooling System',
    description: 'Air-cooled spindle motors with simple installation and maintenance. Suitable for wood, plastic, and aluminum CNC applications.',
    keywords: 'air cooled CNC spindle, low maintenance spindle, DIY CNC spindle, aluminum spindle motor'
  },
  {
    slug: 'cnc-router-spindle',
    title: 'CNC Router Spindle Motor | Powerful & Precise Motor for Routing',
    description: 'Upgrade your CNC router with a high-performance spindle motor for accurate and powerful cutting, carving, and shaping.',
    keywords: 'CNC router spindle, router spindle motor, powerful spindle motor, carving spindle for router'
  },
  {
    slug: 'spindle-motor-price',
    title: 'CNC Spindle Motor Price | Affordable Options for Every Application',
    description: 'Compare spindle motor prices and choose from budget to premium models. Get durable and reliable performance at competitive rates.',
    keywords: 'CNC spindle price, cheap CNC spindle, budget spindle motor, affordable spindle for CNC'
  },
  {
    slug: 'atc-spindle-motor',
    title: 'ATC Spindle Motor for CNC | Automatic Tool Change High-Speed Motor',
    description: 'Shop ATC CNC spindle motors for fast and efficient tool changes. Improve productivity and precision in CNC machining.',
    keywords: 'ATC spindle motor, automatic tool changer spindle, CNC ATC spindle, ISO30 spindle motor'
  },
  {
    slug: 'spindle-motor-supplier',
    title: 'CNC Spindle Motor Supplier India | Reliable OEM for Industrial Needs',
    description: 'Trusted CNC spindle motor supplier in India. Offering OEM-quality motors with excellent service and on-time delivery.',
    keywords: 'CNC spindle supplier India, spindle motor OEM, industrial spindle supplier, buy spindle in India'
  },
  {
    slug: 'servo-spindle-motor',
    title: 'CNC Servo Spindle Motor | High Precision & Torque Performance',
    description: 'Browse servo spindle motors ideal for high-speed and precision CNC machining. Stable torque and responsive control.',
    keywords: 'servo spindle motor, CNC servo motor, torque spindle, high-accuracy servo spindle'
  },
  {
    slug: 'mini-cnc-spindle',
    title: 'Mini CNC Spindle Motor | Compact and Efficient for Small Machines',
    description: 'Compact mini spindle motors ideal for desktop and small CNC routers. Perfect for hobbyists and precision micro-machining.',
    keywords: 'mini CNC spindle, small spindle motor, compact CNC spindle, desktop CNC motor'
  },
  {
    slug: 'engraving-spindle',
    title: 'Engraving Spindle Motor | High-Speed Precision for Laser & CNC',
    description: 'Precision engraving spindles for CNC and laser engraving machines. High-speed and smooth finish for detailed jobs.',
    keywords: 'engraving spindle motor, CNC engraving spindle, laser engraving spindle, precision engraving motor'
  },
  {
    slug: 'metal-cutting-spindle',
    title: 'Spindle Motor for Metal Cutting | Heavy-Duty CNC Spindle',
    description: 'Strong and durable CNC spindle motors built for cutting and milling metals. Reliable torque and heat resistance.',
    keywords: 'metal cutting spindle, heavy duty CNC spindle, milling spindle motor, metal machining spindle'
  },
  {
    slug: 'spindle-for-aluminum',
    title: 'Aluminum Cutting CNC Spindle | High-Speed Precision Spindle Motor',
    description: 'Specialized spindle motors for aluminum machining. High RPM and accurate feed rate for smooth finishes.',
    keywords: 'aluminum CNC spindle, spindle for aluminum, aluminum milling motor, high RPM aluminum spindle'
  },
  {
    slug: 'iso30-spindle-motor',
    title: 'ISO30 CNC Spindle | Balanced Tool Holding for Precision Work',
    description: 'Reliable ISO30 spindle motors for CNC routers and mills. Ideal for heavy-duty and continuous machining tasks.',
    keywords: 'ISO30 spindle motor, CNC ISO30 tool holder, ISO spindle, ATC ISO30 CNC spindle'
  },
  {
    slug: 'spindle-motor-dealer',
    title: 'CNC Spindle Motor Dealers in India | Wholesale & Retail Suppliers',
    description: 'Find trusted CNC spindle motor dealers and distributors across India. Affordable bulk supply and service support.',
    keywords: 'CNC spindle dealer, spindle distributor India, wholesale spindle motor, CNC motor supplier'
  },
  {
    slug: 'industrial-spindle',
    title: 'Industrial Spindle Motor for CNC | Rugged and Long-Lasting Design',
    description: 'Industrial-grade spindle motors engineered for durability and performance in continuous CNC operations.',
    keywords: 'industrial CNC spindle, rugged spindle motor, heavy duty spindle, factory CNC spindle'
  },
  {
    slug: '3kw-spindle-motor',
    title: '3kW CNC Spindle Motor | Power & Performance for Cutting Tasks',
    description: 'Get 3kW spindle motors designed for CNC routers and milling machines. High efficiency, low vibration, and strong cutting ability.',
    keywords: '3kw spindle motor, powerful CNC spindle, 3kw CNC router motor, medium spindle motor'
  },
  {
    slug: '9kw-spindle-motor',
    title: '9kW CNC Spindle Motor | Heavy-Duty Spindle for Industrial Use',
    description: '9kW CNC spindle motor for large-scale CNC machines. Excellent torque, smooth rotation, and reliable industrial performance.',
    keywords: '9kw CNC spindle, heavy spindle motor, industrial CNC motor, high power spindle'
  },
  {
    slug: 'router-spindle-accessories',
    title: 'CNC Spindle Accessories | Tool Holders, Mounts & Cooling Systems',
    description: 'Complete your spindle setup with top-quality accessories including tool holders, brackets, cooling systems, and more.',
    keywords: 'CNC spindle accessories, spindle tool holders, spindle cooling system, mounting brackets for spindle'
  }
];


export default seoPages;
