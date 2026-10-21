import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * Real Bangladesh border, generated from Natural Earth data (npm: world-atlas, 50m)
 * using d3-geo's Mercator projection. No map library is needed at runtime.
 *
 * City markers use real [lon, lat] values and the SAME Mercator projection
 * (SCALE / TRANSLATE below), so they always land on the right spot.
 */
const VIEW_W = 431;
const VIEW_H = 604;
const SCALE = 5209.785491897827;
const TRANSLATE = [-7997.718359374952, 2530.548764329134];

const project = (lon, lat) => {
  const rad = Math.PI / 180;
  return {
    x: SCALE * lon * rad + TRANSLATE[0],
    y: TRANSLATE[1] - SCALE * Math.log(Math.tan(Math.PI / 4 + (lat * rad) / 2)),
  };
};

const BANGLADESH_PATH =
  'M99.6,470L99.9,460.8L99.3,452.1L92.4,428.8L87.5,417L88.2,413.1L87.8,411.6L85.9,396.2L82.9,386.7L81.3,376.6L88.5,362.2L85.5,359.8L77.4,357.9L69.8,355.5L67.9,351.7L71.1,337.5L67.2,332L61.6,326.3L60,324L58,321.1L55.4,313.9L60.7,298.9L67.5,281.3L68.8,274.5L70.2,262.9L70.5,258.4L69.8,254.1L62.3,249.1L49.2,247L40,242.7L34.5,236.2L29.9,233.6L24.3,235.6L17.1,233.1L11.2,226.7L6,218.9L6.7,215.2L8,210.4L17.5,190.2L21.1,189.5L29.2,193.3L32.5,193.5L37.8,185.5L45.3,162.7L56.1,162.7L65.6,163.6L71.8,164.6L78.3,163.9L84.9,162L88.5,159.2L90.5,155.5L89.8,152.4L81.6,148L78.7,144.9L76.4,135.8L73.8,132.3L58,131.8L49.5,127.6L45,123.9L37.1,111.3L27,102.2L17.5,99.9L13.5,96.9L11.6,92.2L12.9,85.3L15.8,79L17.8,72L25.3,62.8L34.2,54.7L38.4,49.3L44,43.5L44.6,40.1L43.6,36.6L39.1,33.1L35.8,31.8L35.5,29.7L37.4,23.5L42,22.8L51.2,28.3L60.3,37.1L65.9,45.1L65.9,51.2L69.5,52.3L73.1,52.5L79.3,55.3L85.5,54.4L89.5,56L92.1,55.4L93.1,51.9L90.1,46.6L87.8,42.8L90.5,39.1L93.4,38.4L96.7,39.2L100.9,42.6L104.2,49.6L104.9,60.4L111.7,70L121.2,77.1L128.4,80.2L137.3,82.5L144.8,80.2L148.7,73.6L147.1,67.4L148.1,62L151,59L155.9,59.1L159.5,63.5L169.7,86.7L167.7,97.1L170,125.3L167.4,143.8L167.7,147.8L169,151L170.7,152.2L173.6,152.2L186,155.7L196.5,159.5L208.6,163L225.6,165.8L236.1,164.8L241.7,164.8L252.2,165.6L280.3,164.1L303.2,163.7L312.7,166.3L320.3,167.4L346.1,165.5L372.3,164.6L386.4,170.5L401.8,180.1L410.3,187.2L411.9,191.3L410.9,194.7L408,196.6L402.7,196.8L390.6,192.1L388.3,193.5L388.7,203.1L388.3,204.5L385.7,213L378.2,232.3L376.9,240.8L375.2,243L373.6,244.2L367.7,244.6L363.1,246L361.5,249.1L358.5,255.5L356.6,262.1L353.6,264.1L347.1,260.5L342.8,261L337.6,262.6L332.4,266.2L328.8,270.9L324.5,272.4L312.4,271.6L310.1,272.3L308.5,275.5L307.2,279.7L297.7,289.4L294.1,305.1L291.4,315.2L291.8,323.2L300,343.7L305.5,370.3L307.5,373L309.4,373.9L310.1,373.4L310.1,367.7L310.4,361L313,359.5L316.3,360.8L319.6,366.7L323.2,377.3L327.1,381.4L333,382.6L339.9,380.2L345.1,375.4L347.1,370.1L345.8,360L345.5,352.2L348.4,345L360.2,334L362.1,330.7L361.2,321.4L361.2,312.7L365.8,312.1L371.6,313.5L379.2,309.2L381.5,309.2L384.7,313.7L390,313L393.9,332L398.2,348.6L398.2,356.7L398.8,373.7L400.4,387.6L403.4,390.9L406.7,398.2L409.9,407L412.2,411.7L413.9,427.5L416.2,438.8L418.8,474.4L419.8,481.2L420.7,484.9L420.7,517.4L421.7,531.2L424.3,542.7L425,546.9L422.1,550.5L419.4,551.2L416.8,545.6L410.6,541.5L401.4,536.9L397.8,533.9L392.9,535.1L386.7,541.8L384.1,548.3L385.1,557.1L387,565.9L391.6,570.8L391.9,576.4L393.6,583.5L395.9,590.1L397.2,597.2L395.5,597.2L390.3,588.2L385.4,578.4L372.6,559.8L368.7,526.4L368.4,509.9L359.9,490.6L354,463.7L351.7,456.7L354.6,448L355.3,444.7L353.6,445.4L349.1,449.8L343.5,439.1L339.9,429.5L324.8,409.5L320.6,400.6L320.3,392.1L314,400.6L305.2,406.8L296.4,416L290.5,418.8L271.8,420.5L261,408.2L245.6,378.2L243.3,371.3L245.3,353.6L241.7,336.9L241.7,328L240.7,322.1L238.1,323.5L236.8,327.5L237.4,333.7L236.4,339L223,338L210.3,335.6L221.4,344.3L233.2,346.4L239.4,354.3L240.4,360.5L240.1,367.4L233.8,372.3L228.3,375.3L229.2,381.9L236.1,390L227.6,392.4L225.6,397.7L225.3,405.1L229.6,411.7L231.2,416.7L230.2,421.2L234.2,426.1L240.1,436.4L241.7,443.5L239.4,453.8L236.1,457.7L230.9,461.6L218.1,474.4L211.9,489L206.7,495.8L200.1,497L197.8,494L192.3,490.2L192.3,483.1L193.9,477.5L204.7,463.7L198.8,465.5L191.9,469.5L181.8,476.8L178.2,467.7L176.2,459.2L176.2,448.8L184.4,433.3L174.9,441L172.3,450.7L173.6,462.1L172.3,470.1L168.7,480.7L163.8,487L155.6,491.1L152,497.4L146.4,502L146.4,492.8L144.8,480.7L138.9,452.1L137.6,458.2L140.5,475.9L140.5,487.5L136,496.7L127.1,506.4L120.2,507.7L116.3,506.4L110.1,500.3L103.5,491.6L102.2,477.6ZM256.4,470.3L240.7,473.7L232.5,472.7L247.6,446.9L247.3,435.3L245,425.9L237.1,418.4L236.8,412.9L233.2,405.6L231.5,396.9L240.1,394.1L246.9,399.1L247.9,401.8L249.2,409L252.8,416.4L264.6,431.4L264.6,440.8L261.3,463.3Z';

const DeliveryMap = () => {
  const [activeCity, setActiveCity] = useState(null);

  // Real coordinates (lon, lat). To add a city, just add a line here.
  const locations = useMemo(
    () =>
      [
        { name: 'Dhaka', lon: 90.41, lat: 23.81, delivery: '1-2 Days' },
        { name: 'Chattogram', lon: 91.78, lat: 22.36, delivery: '2-3 Days' },
        { name: 'Sylhet', lon: 91.87, lat: 24.9, delivery: '2-3 Days' },
        { name: 'Rajshahi', lon: 88.6, lat: 24.37, delivery: '2-4 Days' },
        { name: 'Khulna', lon: 89.55, lat: 22.82, delivery: '3-4 Days' },
        { name: 'Rangpur', lon: 89.25, lat: 25.75, delivery: '3-4 Days' },
        { name: 'Barishal', lon: 90.37, lat: 22.7, delivery: '3-5 Days' },
      ].map((loc) => ({ ...loc, ...project(loc.lon, loc.lat) })),
    []
  );

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            We Deliver Across Bangladesh
          </h2>
          <p className="text-gray-600">
            Fast and reliable delivery to your doorstep. Check if your area is covered.
          </p>
        </div>

        {/* Map Container */}
        <div className=" bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100 shadow-sm">
          {/* Wrapper sized to the SVG so markers line up exactly with the map */}
          <div className="relative w-full max-w-md mx-auto">
            <svg
              viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
              className="w-full h-auto fill-white stroke-emerald-300 drop-shadow-md"
              strokeWidth="2"
              strokeLinejoin="round"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Map of Bangladesh"
            >
              <path d={BANGLADESH_PATH} />
            </svg>

            {/* Markers */}
            {locations.map((loc) => (
              <div
                key={loc.name}
                className="absolute -translate-x-1/2 -translate-y-1/2 h-4 w-4 cursor-pointer"
                style={{
                  left: `${(loc.x / VIEW_W) * 100}%`,
                  top: `${(loc.y / VIEW_H) * 100}%`,
                }}
                onMouseEnter={() => setActiveCity(loc.name)}
                onMouseLeave={() => setActiveCity(null)}
                onClick={() => setActiveCity(activeCity === loc.name ? null : loc.name)}
              >
                {/* Pulsing ring */}
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>

                {/* Marker dot */}
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-700 border-2 border-white shadow-md"></span>

                {/* Tooltip */}
                {activeCity === loc.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 bg-gray-900 text-white text-xs rounded-lg py-2 px-3 text-center shadow-lg pointer-events-none z-10"
                  >
                    <div className="font-bold text-sm mb-1">{loc.name}</div>
                    <div className="text-emerald-300">Est. {loc.delivery}</div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 flex justify-center items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-700"></span>
            </span>
            <span>Active Delivery Zone</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryMap;