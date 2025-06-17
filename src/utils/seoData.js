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
    slug: 'planetary-gearbox',
    title: 'Multi-Stage Planetary Gearbox | Increased Torque & Load Capacity',
    description: 'Multi-stage planetary gearboxes deliver increased torque and higher load-bearing capacity for industrial machines.',
    keywords: 'multi-stage planetary gearbox, high torque gearbox, heavy load gearbox, industrial gear drive'
  },
  {
    slug: 'planetary-gearbox',
    title: 'Precision & Durable Planetary Gearbox | Long Life Industrial Gear',
    description: 'Get precision-engineered and highly durable planetary gearboxes for consistent industrial performance and long service life.',
    keywords: 'precision planetary gearbox, durable gearbox, long life gear reducer, industrial transmission gearbox'
  }
 

];

export default seoPages;
