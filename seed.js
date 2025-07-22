const sequelize = require('./config/db');
const { Shop, Installer, Category, Product, Project } = require('./models');
const User = require('./models/userModel');
require('./models');
const { Country } = require('./models');
const { Pakistan } = require('./PakistanList');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const userCount = await User.count();
    const shopCount = await Shop.count();
    const installerCount = await Installer.count();
    const categoryCount = await Category.count();
    if (categoryCount === 0) {
      const category1 = await Category.create({
        name: 'Battery',
        avatar: null,
        description: 'All Type of Batteries'
      })
      if (category1) {
        await Category.bulkCreate([{
          parent_id: category1.id,
          name: 'Dry Cell Battery',
          avatar: null,
          description: '​A dry-cell battery is a device made of one or more electrochemical cells that convert stored chemical energy into electrical energy. It contains an electrolyte that is contained within a paste or other moist medium. A Standard dry cell battery includes a zinc anode and a carbon cathode within a central rod.'
        },
        {
          parent_id: category1.id,
          name: 'Lithium Battery',
          avatar: null,
          description: 'Lithium-ion cells can be manufactured to optimize energy or power density. Handheld electronics mostly use lithium polymer batteries (with a polymer gel as an electrolyte), a lithium cobalt oxide (LiCoO. 2) cathode material, and a graphite anode, which together offer high energy density. Lithium iron phosphate.',
        }], { individualHooks: true })
      }

      const category2 = await Category.create({
        name: 'Inverters',
        avatar: null,
        description: 'All Type of Inverters'
      })
      if (category2) {
        await Category.bulkCreate([{
          parent_id: category2.id,
          avatar: null,
          name: 'Hybrid Inverters',
          description: 'A hybrid solar inverter is a piece of equipment that is created by combining a solar inverter and a battery inverter into a single unit. This allows the hybrid solar inverter to intelligently handle power coming from your solar panels, solar batteries, and the utility grid all at the same time'
        },
        {
          parent_id: category2.id,
          name: 'On Grid Inverters',
          avatar: null,
          description: 'These systems are directly connected to the local utility grid, allowing users to draw electricity from the grid when their solar panels are not producing enough power, such as during the night or on cloudy days',
        }], { individualHooks: true })
      }
      const category3 = await Category.create({
        name: 'Solar Panels',
        avatar: null,
        description: 'All Type of Solar Panels'
      })
      if (category3) {
        await Category.bulkCreate([{
          parent_id: category3.id,
          avatar: null,
          name: 'Monocrystalline Solar Panels (Mono-SI)',
          description: `Monocrystalline PV panels are made from a single piece of silicon, therefore making it easier for electricity to flow through. They have a pyramid cell pattern which offers a larger surface area enabling monocrystalline PV panels to collect a greater amount of energy from the sun's rays.`
        },
        {
          parent_id: category3.id,
          avatar: null,
          name: 'Polycrystalline Solar Panels (p-Si)',
          description: 'A polycrystalline solar panel is made up of several photovoltaic cells, each of which contains silicon crystals that serve as semiconductors. These types of solar cells are exposed to sunlight, which causes the silicon to absorb its energy and release electrons.'
        }, {
          parent_id: category3.id,
          avatar: null,
          name: 'Thin-Film: Amorphous Silicon Solar Panels (A-SI)',
          description: 'Amorphous silicon solar cells have a disordered structure form of silicon and have 40 times higher light absorption rate as compared to the mono-Si cells. They are widely used and most developed thin-film solar cells.'
        },
        {
          parent_id: category3.id,
          avatar: null,
          name: 'Concentrated PV Cell (CVP)',
          description: 'In Concentrating Photovoltaics (CPV), a large area of sunlight is focused onto the solar cell with the help of an optical device. By concentrating sunlight onto a small area, this technology has three competitive advantages: Requires less photovoltaic material to capture the same sunlight as non-concentrating pv.'
        }], { individualHooks: true })
      }
      const category4 = await Category.create({
        name: 'Structures',
        avatar: null,
        description: 'All Type of Structures'
      })
      if (category4) {
        await Category.bulkCreate([{
          parent_id: category4.id,
          avatar: null,
          name: 'Rooftop Mounting Structure',
          description: 'Railed mounting systems are one of the most common rooftop solar mounting structures. They consist of a set of rails attached to the roof, with each panel secured to the rails via clamps. The rails are then anchored to the roof with bolts and screws.'
        },
        {
          parent_id: category4.id,
          avatar: null,
          name: 'Ground Mounting Structure',
          description: 'Ground mounted arrays are installed at grade on galvanized steel and / or aluminum support structures. The support structures are bound to the earth using foundations consisting of driven piles, helical piles, ground screws, concrete footings, concrete ballast or a mixture of these components.'
        },
        {
          parent_id: category4.id,
          avatar: null,
          name: 'Floating Mounting Structure',
          description: `The floating mounting system incorporates high-density polyethylene floating blocks and is designed in accordance with the conditions of the water. The floating blocks can either be fixed with anchor points under or at the water's edge.`
        },
        {
          parent_id: category4.id,
          avatar: null,
          name: 'Pole Mounted Structure',
          description: 'Pole mounted structures are especially good at maximising energy output, as they are the most suited to sun tracking systems which follow the sun and ensure maximum exposure. They are not limited to the surface area of a rooftop, meaning those with enough space can choose to install larger solar PV systems.'
        },
        {
          parent_id: category4.id,
          avatar: null,
          name: 'Carport Solar Module Mounting Structure',
          description: 'Solar First Carport Mounting System adopts triangle supporting structure technology, which is very strong and secure. With full aluminum alloy and SS 304 bolts & nuts material, it is with concise and beautiful appearance. It is quite easy and fast installation without any welding in the site.'
        }, {
          parent_id: category4.id,
          avatar: null,
          name: 'Smartflower Mounting Structure',
          description: 'This tracking mechanism consists of a base support, a rotary table, a swivel plate, and a fanning shaft on which the solar panels are mounted. The rotary table bears one end of the swivel plate. Nearby, a crank is linked via a connecting rod to the other end of the swivel plate.'
        },
        {
          parent_id: category4.id,
          avatar: null,
          name: 'Tracking System Mounting Structure',
          description: `Solar Tracking Systems are a special form of mounting structures and designed to maximize the yield of the solar PV system by following the course of the sun. By following the course of the sun, the solar panel will collect energy for the longest period of the day.
As the position of the sun is always changing, the only way to get maximum yield out of your pv system is to control the position of the solar panels in accordance with the motion of the sun.
These tracking systems collect significantly more sun radiation compared to solar panels that are installed under a fixed angle.`
        }], { individualHooks: true })
      }
      const category5 = await Category.create({
        name: 'Cables',
        avatar: null,
        description: 'All Type of Cables'
      })
      if (category5) {
        await Category.bulkCreate([{
          parent_id: category5.id,
          name: 'PV wire',
          avatar: null,
          description: 'PV wire is the most commonly used wire for solar panel installations in Pakistan. It is made of stranded copper conductors and sunlight-resistant insulation, making it suitable for outdoor use and able to withstand extreme temperatures and weather conditions. PV wire is available in different gauges, with 10-12 AWG being the recommended gauge for solar panel installations in Pakistan. PV wire is commonly used in grid-tied solar systems.'
        },
        {
          parent_id: category5.id,
          name: 'USE-2 wire',
          avatar: null,
          description: 'USE-2 wire is designed for underground use and can resist moisture and abrasion. It is made of stranded copper conductors and cross-linked polyethylene (XLPE) insulation. USE-2 wire is available in different gauges, with 10 AWG being the recommended gauge for solar panel installations in Pakistan. USE-2 wire is commonly used in off-grid solar systems.'
        }, {
          parent_id: category5.id,
          name: 'THHN wire',
          avatar: null,
          description: 'THHN wire is made of solid or stranded copper conductors and thermoplastic insulation. It is suitable for indoor use and can be used in conduit or cable trays. THHN wire is available in different gauges, with 10-12 AWG being the recommended gauge for solar panel installations in Pakistan. THHN wire is commonly used in residential solar systems.'
        },
        ], { individualHooks: true })
      }
    }
    await Country.create(Pakistan)
    if (userCount === 0) {
      await User.create(
        {
          name: 'Soltronic',
          email: 'admin@soltronic.com',
          type: 'superAdmin',
          password: 'soltronic',
          avatar: null,
          phone_no: '03000000000',
          address: {
            street: "Soltronic, 75 Block F2 Phase 1 Johar Town, Lahore, Pakistan",
            city: "Lahore",
            state: "Punjab",
            area: 'Phase 1',
            country: "Pakistan",
            zip: "54000",
            latitude: 31.4713455,
            longitude: 74.2801345
          },
          status: 'active',


        });
      if (shopCount === 0) {
        const dryBatteryCategory = await Category.findOne({ where: { name: 'Dry Cell Battery' } });
        const lithiumBatteryCategory = await Category.findOne({ where: { name: 'Lithium Battery' } });
        const hybridInverterCategory = await Category.findOne({ where: { name: 'Hybrid Inverters' } });
        const onGridInverterCategory = await Category.findOne({ where: { name: 'On Grid Inverters' } });
        const monoSolarPanelCategory = await Category.findOne({ where: { name: 'Monocrystalline Solar Panels (Mono-SI)' } });
        const polySolarPanelCategory = await Category.findOne({ where: { name: 'Polycrystalline Solar Panels (p-Si)' } });
        const thinFilmSolarPanelCategory = await Category.findOne({ where: { name: 'Thin-Film: Amorphous Silicon Solar Panels (A-SI)' } });
        const concentratedSolarPanelCategory = await Category.findOne({ where: { name: 'Concentrated PV Cell (CVP)' } });
        const roofTopStructureCategory = await Category.findOne({ where: { name: 'Rooftop Mounting Structure' } });
        const groundStructureCategory = await Category.findOne({ where: { name: 'Ground Mounting Structure' } });
        const floatingStructureCategory = await Category.findOne({ where: { name: 'Floating Mounting Structure' } });
        const poleStructureCategory = await Category.findOne({ where: { name: 'Pole Mounted Structure' } });
        const carportStructureCategory = await Category.findOne({ where: { name: 'Carport Solar Module Mounting Structure' } });
        const smartFlowerStructureCategory = await Category.findOne({ where: { name: 'Smartflower Mounting Structure' } });
        const trackingStructureCategory = await Category.findOne({ where: { name: 'Tracking System Mounting Structure' } });
        const pvWireStructureCategory = await Category.findOne({ where: { name: 'PV wire' } });
        const use2WireCategory = await Category.findOne({ where: { name: 'USE-2 wire' } });
        const thhnWireCategory = await Category.findOne({ where: { name: 'THHN wire' } });
        const user = await User.create(
          {
            name: 'SOLTRONICS ENERGY DISTRIBUTION',
            email: 'shop@soltronic.com',
            password: "soltronic@123",
            type: 'shop',
            avatar: null,
            phone_no: '03000000001',
            address: {
              street: "Soltronic, 75 Block F2 Phase 1 Johar Town, Lahore, Pakistan",
              city: "Lahore",
              state: "Punjab",
              area: 'Phase 1',
              country: "Pakistan",
              zip: "54000",
              latitude: 31.4713455,
              longitude: 74.2801345
            },
            status: 'active',
          });
        if (user) {
          const shop = await Shop.create(
            {
              user_id: user.id,
              owner_name: 'Faheem Maalik',

            }
          );

          if (shop) {


            await Product.bulkCreate([
              {
                shop_id: shop.id,
                title: "Dry Battery",
                description: '​A dry-cell battery is a device made of one or more electrochemical cells that convert stored chemical energy into electrical energy. It contains an electrolyte that is contained within a paste or other moist medium. A Standard dry cell battery includes a zinc anode and a carbon cathode within a central rod.',
                price: 14500,
                images: [],
                category_id: dryBatteryCategory ? dryBatteryCategory.id : null
              },
              {
                shop_id: shop.id,
                title: "Lithuim Battery",
                description: 'Lithium-ion cells can be manufactured to optimize energy or power density. Handheld electronics mostly use lithium polymer batteries (with a polymer gel as an electrolyte), a lithium cobalt oxide (LiCoO. 2) cathode material, and a graphite anode, which together offer high energy density. Lithium iron phosphate.',
                price: 10000,
                images: [],
                category_id: lithiumBatteryCategory ? lithiumBatteryCategory.id : null
              },
              {
                shop_id: shop.id,
                title: "Monocrystalline Solar Panels (Mono-SI)",
                description: `Monocrystalline PV panels are made from a single piece of silicon, therefore making it easier for electricity to flow through. They have a pyramid cell pattern which offers a larger surface area enabling monocrystalline PV panels to collect a greater amount of energy from the sun's rays.`,
                price: 25000,
                images: [],
                category_id: monoSolarPanelCategory ? monoSolarPanelCategory.id : null
              },
              {
                shop_id: shop.id,
                title: "Polycrystalline Solar Panels (p-Si)",
                description: `A polycrystalline solar panel is made up of several photovoltaic cells, each of which contains silicon crystals that serve as semiconductors. These types of solar cells are exposed to sunlight, which causes the silicon to absorb its energy and release electrons.`,
                images: [],
                price: 25000,
                category_id: polySolarPanelCategory ? polySolarPanelCategory.id : null
              },
              {
                shop_id: shop.id,
                title: "Thin-Film: Amorphous Silicon Solar Panels (A-SI)",
                description: `Amorphous silicon solar cells have a disordered structure form of silicon and have 40 times higher light absorption rate as compared to the mono-Si cells. They are widely used and most developed thin-film solar cells.`,
                price: 25000,
                images: [],
                category_id: thinFilmSolarPanelCategory ? thinFilmSolarPanelCategory.id : null
              },
              {
                shop_id: shop.id,
                title: "Concentrated PV Cell (CVP)",
                description: `In Concentrating Photovoltaics (CPV), a large area of sunlight is focused onto the solar cell with the help of an optical device. By concentrating sunlight onto a small area, this technology has three competitive advantages: Requires less photovoltaic material to capture the same sunlight as non-concentrating pv.`,
                price: 25000,
                images: [],
                category_id: concentratedSolarPanelCategory ? concentratedSolarPanelCategory.id : null
              },
              {
                shop_id: shop.id,
                title: "On Grid Inverter",
                description: 'These systems are directly connected to the local utility grid, allowing users to draw electricity from the grid when their solar panels are not producing enough power, such as during the night or on cloudy days',
                price: 25000,
                images: [],
                category_id: onGridInverterCategory ? onGridInverterCategory.id : null
              },
              {
                shop_id: shop.id,
                title: "Hybrid Inverter",
                description: 'A hybrid solar inverter is a piece of equipment that is created by combining a solar inverter and a battery inverter into a single unit. This allows the hybrid solar inverter to intelligently handle power coming from your solar panels, solar batteries, and the utility grid all at the same time',
                price: 25000,
                images: [],
                category_id: hybridInverterCategory ? hybridInverterCategory.id : null
              },
              {
                shop_id: shop.id,
                title: "Rooftop Mounting Structure",
                description: 'Railed mounting systems are one of the most common rooftop solar mounting structures. They consist of a set of rails attached to the roof, with each panel secured to the rails via clamps. The rails are then anchored to the roof with bolts and screws.',
                price: 25000,
                images: [],
                category_id: roofTopStructureCategory ? roofTopStructureCategory.id : null
              },
              {
                shop_id: shop.id,
                images: [],
                title: "Ground Mounting Structure",
                description: 'Ground mounted arrays are installed at grade on galvanized steel and / or aluminum support structures. The support structures are bound to the earth using foundations consisting of driven piles, helical piles, ground screws, concrete footings, concrete ballast or a mixture of these components.',
                price: 25000,
                category_id: groundStructureCategory ? groundStructureCategory.id : null
              },
              {
                shop_id: shop.id,
                title: "Floating Mounting Structure",
                description: `The floating mounting system incorporates high-density polyethylene floating blocks and is designed in accordance with the conditions of the water. The floating blocks can either be fixed with anchor points under or at the water's edge.`,
                images: [],
                price: 25000,
                category_id: floatingStructureCategory ? floatingStructureCategory.id : null
              },
              {
                shop_id: shop.id,
                title: "Pole Mounted Structure",
                description: 'Pole mounted structures are especially good at maximising energy output, as they are the most suited to sun tracking systems which follow the sun and ensure maximum exposure. They are not limited to the surface area of a rooftop, meaning those with enough space can choose to install larger solar PV systems.',
                price: 25000,
                images: [],
                category_id: poleStructureCategory ? poleStructureCategory.id : null
              },
              {
                shop_id: shop.id,
                title: "Carport Solar Module Mounting Structure",
                description: 'Solar First Carport Mounting System adopts triangle supporting structure technology, which is very strong and secure. With full aluminum alloy and SS 304 bolts & nuts material, it is with concise and beautiful appearance. It is quite easy and fast installation without any welding in the site.',
                price: 25000,
                images: [],
                category_id: carportStructureCategory ? carportStructureCategory.id : null
              },
              {
                shop_id: shop.id,
                title: "Smartflower Mounting Structure",
                description: 'This tracking mechanism consists of a base support, a rotary table, a swivel plate, and a fanning shaft on which the solar panels are mounted. The rotary table bears one end of the swivel plate. Nearby, a crank is linked via a connecting rod to the other end of the swivel plate.',
                price: 25000,
                images: [],
                category_id: smartFlowerStructureCategory ? smartFlowerStructureCategory.id : null
              },
              {
                shop_id: shop.id,
                title: "Tracking System Mounting Structure",
                description: `Solar Tracking Systems are a special form of mounting structures and designed to maximize the yield of the solar PV system by following the course of the sun. By following the course of the sun, the solar panel will collect energy for the longest period of the day.
As the position of the sun is always changing, the only way to get maximum yield out of your pv system is to control the position of the solar panels in accordance with the motion of the sun.
These tracking systems collect significantly more sun radiation compared to solar panels that are installed under a fixed angle.`,
                price: 25000,
                images: [],
                category_id: trackingStructureCategory ? trackingStructureCategory.id : null
              },
              {
                shop_id: shop.id,
                title: "PV wire",
                description: `PV wire is the most commonly used wire for solar panel installations in Pakistan. It is made of stranded copper conductors and sunlight-resistant insulation, making it suitable for outdoor use and able to withstand extreme temperatures and weather conditions. PV wire is available in different gauges, with 10-12 AWG being the recommended gauge for solar panel installations in Pakistan. PV wire is commonly used in grid-tied solar systems.`,
                price: 25000,
                images: [],
                category_id: pvWireStructureCategory ? pvWireStructureCategory.id : null
              },
              {
                shop_id: shop.id,
                title: "USE-2 wire",
                description: `USE-2 wire is designed for underground use and can resist moisture and abrasion. It is made of stranded copper conductors and cross-linked polyethylene (XLPE) insulation. USE-2 wire is available in different gauges, with 10 AWG being the recommended gauge for solar panel installations in Pakistan. USE-2 wire is commonly used in off-grid solar systems.`,
                price: 25000,
                images: [],
                category_id: use2WireCategory ? use2WireCategory.id : null
              },
              {
                shop_id: shop.id,
                title: "THHN wire",
                description: 'THHN wire is made of solid or stranded copper conductors and thermoplastic insulation. It is suitable for indoor use and can be used in conduit or cable trays. THHN wire is available in different gauges, with 10-12 AWG being the recommended gauge for solar panel installations in Pakistan. THHN wire is commonly used in residential solar systems.',
                price: 25000,
                images: [],
                category_id: thhnWireCategory ? thhnWireCategory.id : null
              }
            ], { individualHooks: true })
          }

        }
        const user1 = await User.create(
          {
            name: 'Solar Solutions',
            email: 'solarSolutions@soltronic.com',
            password: "soltronic@123",
            type: 'shop',
            avatar: null,
            phone_no: '03000000001',
            address: {
              street: "Soltronic, 75 Block F2 Phase 1 Johar Town, Lahore, Pakistan",
              city: "Lahore",
              state: "Punjab",
              area: 'Phase 1',
              country: "Pakistan",
              zip: "54000",
              latitude: 31.4713455,
              longitude: 74.2801345
            },
            status: 'active',
          });
        if (user1) {
          const shop = await Shop.create(
            {
              user_id: user1.id,
              owner_name: 'Abbas Ahmed',

            }
          );
          if (shop) {


            await Product.bulkCreate([
              {
                shop_id: shop.id,
                title: "Dry Battery",
                description: '​A dry-cell battery is a device made of one or more electrochemical cells that convert stored chemical energy into electrical energy. It contains an electrolyte that is contained within a paste or other moist medium. A Standard dry cell battery includes a zinc anode and a carbon cathode within a central rod.',
                price: 14500,
                images: [],
                category_id: dryBatteryCategory ? dryBatteryCategory.id : null
              },
              {
                shop_id: shop.id,
                title: "Lithuim Battery",
                description: 'Lithium-ion cells can be manufactured to optimize energy or power density. Handheld electronics mostly use lithium polymer batteries (with a polymer gel as an electrolyte), a lithium cobalt oxide (LiCoO. 2) cathode material, and a graphite anode, which together offer high energy density. Lithium iron phosphate.',
                price: 10000,
                images: [],
                category_id: lithiumBatteryCategory ? lithiumBatteryCategory.id : null
              },
              {
                shop_id: shop.id,
                title: "Monocrystalline Solar Panels (Mono-SI)",
                description: `Monocrystalline PV panels are made from a single piece of silicon, therefore making it easier for electricity to flow through. They have a pyramid cell pattern which offers a larger surface area enabling monocrystalline PV panels to collect a greater amount of energy from the sun's rays.`,
                price: 25000,
                images: [],
                category_id: monoSolarPanelCategory ? monoSolarPanelCategory.id : null
              },
              {
                shop_id: shop.id,
                title: "Polycrystalline Solar Panels (p-Si)",
                description: `A polycrystalline solar panel is made up of several photovoltaic cells, each of which contains silicon crystals that serve as semiconductors. These types of solar cells are exposed to sunlight, which causes the silicon to absorb its energy and release electrons.`,
                price: 25000,
                images: [],
                category_id: polySolarPanelCategory ? polySolarPanelCategory.id : null
              },
              {
                shop_id: shop.id,
                title: "Thin-Film: Amorphous Silicon Solar Panels (A-SI)",
                description: `Amorphous silicon solar cells have a disordered structure form of silicon and have 40 times higher light absorption rate as compared to the mono-Si cells. They are widely used and most developed thin-film solar cells.`,
                price: 25000,
                images: [],
                category_id: thinFilmSolarPanelCategory ? thinFilmSolarPanelCategory.id : null
              },
              {
                shop_id: shop.id,
                title: "Concentrated PV Cell (CVP)",
                description: `In Concentrating Photovoltaics (CPV), a large area of sunlight is focused onto the solar cell with the help of an optical device. By concentrating sunlight onto a small area, this technology has three competitive advantages: Requires less photovoltaic material to capture the same sunlight as non-concentrating pv.`,
                price: 25000,
                images: [],
                category_id: concentratedSolarPanelCategory ? concentratedSolarPanelCategory.id : null
              },
              {
                shop_id: shop.id,
                title: "On Grid Inverter",
                description: 'These systems are directly connected to the local utility grid, allowing users to draw electricity from the grid when their solar panels are not producing enough power, such as during the night or on cloudy days',
                price: 25000,
                images: [],
                category_id: onGridInverterCategory ? onGridInverterCategory.id : null
              },
              {
                shop_id: shop.id,
                title: "Hybrid Inverter",
                description: 'A hybrid solar inverter is a piece of equipment that is created by combining a solar inverter and a battery inverter into a single unit. This allows the hybrid solar inverter to intelligently handle power coming from your solar panels, solar batteries, and the utility grid all at the same time',
                price: 25000,
                images: [],
                category_id: hybridInverterCategory ? hybridInverterCategory.id : null
              },
              {
                shop_id: shop.id,
                title: "Rooftop Mounting Structure",
                description: 'Railed mounting systems are one of the most common rooftop solar mounting structures. They consist of a set of rails attached to the roof, with each panel secured to the rails via clamps. The rails are then anchored to the roof with bolts and screws.',
                price: 25000,
                images: [],
                category_id: roofTopStructureCategory ? roofTopStructureCategory.id : null
              },
              {
                shop_id: shop.id,
                title: "Ground Mounting Structure",
                description: 'Ground mounted arrays are installed at grade on galvanized steel and / or aluminum support structures. The support structures are bound to the earth using foundations consisting of driven piles, helical piles, ground screws, concrete footings, concrete ballast or a mixture of these components.',
                price: 25000,
                images: [],
                category_id: groundStructureCategory ? groundStructureCategory.id : null
              },
              {
                shop_id: shop.id,
                title: "Floating Mounting Structure",
                description: `The floating mounting system incorporates high-density polyethylene floating blocks and is designed in accordance with the conditions of the water. The floating blocks can either be fixed with anchor points under or at the water's edge.`,
                price: 25000,
                images: [],
                category_id: floatingStructureCategory ? floatingStructureCategory.id : null
              },
              {
                shop_id: shop.id,
                title: "Pole Mounted Structure",
                description: 'Pole mounted structures are especially good at maximising energy output, as they are the most suited to sun tracking systems which follow the sun and ensure maximum exposure. They are not limited to the surface area of a rooftop, meaning those with enough space can choose to install larger solar PV systems.',
                price: 25000,
                images: [],
                category_id: poleStructureCategory ? poleStructureCategory.id : null
              },
              {
                shop_id: shop.id,
                title: "Carport Solar Module Mounting Structure",
                description: 'Solar First Carport Mounting System adopts triangle supporting structure technology, which is very strong and secure. With full aluminum alloy and SS 304 bolts & nuts material, it is with concise and beautiful appearance. It is quite easy and fast installation without any welding in the site.',
                price: 25000,
                images: [],
                category_id: carportStructureCategory ? carportStructureCategory.id : null
              },
              {
                shop_id: shop.id,
                title: "Smartflower Mounting Structure",
                description: 'This tracking mechanism consists of a base support, a rotary table, a swivel plate, and a fanning shaft on which the solar panels are mounted. The rotary table bears one end of the swivel plate. Nearby, a crank is linked via a connecting rod to the other end of the swivel plate.',
                price: 25000,
                images: [],
                category_id: smartFlowerStructureCategory ? smartFlowerStructureCategory.id : null
              },
              {
                shop_id: shop.id,
                title: "Tracking System Mounting Structure",
                description: `Solar Tracking Systems are a special form of mounting structures and designed to maximize the yield of the solar PV system by following the course of the sun. By following the course of the sun, the solar panel will collect energy for the longest period of the day.
As the position of the sun is always changing, the only way to get maximum yield out of your pv system is to control the position of the solar panels in accordance with the motion of the sun.
These tracking systems collect significantly more sun radiation compared to solar panels that are installed under a fixed angle.`,
                price: 25000,
                images: [],
                category_id: trackingStructureCategory ? trackingStructureCategory.id : null
              },
              {
                shop_id: shop.id,
                title: "PV wire",
                description: `PV wire is the most commonly used wire for solar panel installations in Pakistan. It is made of stranded copper conductors and sunlight-resistant insulation, making it suitable for outdoor use and able to withstand extreme temperatures and weather conditions. PV wire is available in different gauges, with 10-12 AWG being the recommended gauge for solar panel installations in Pakistan. PV wire is commonly used in grid-tied solar systems.`,
                price: 25000,
                images: [],
                category_id: pvWireStructureCategory ? pvWireStructureCategory.id : null
              },
              {
                shop_id: shop.id,
                title: "USE-2 wire",
                description: `USE-2 wire is designed for underground use and can resist moisture and abrasion. It is made of stranded copper conductors and cross-linked polyethylene (XLPE) insulation. USE-2 wire is available in different gauges, with 10 AWG being the recommended gauge for solar panel installations in Pakistan. USE-2 wire is commonly used in off-grid solar systems.`,
                price: 25000,
                images: [],
                category_id: use2WireCategory ? use2WireCategory.id : null
              },
              {
                shop_id: shop.id,
                title: "THHN wire",
                description: 'THHN wire is made of solid or stranded copper conductors and thermoplastic insulation. It is suitable for indoor use and can be used in conduit or cable trays. THHN wire is available in different gauges, with 10-12 AWG being the recommended gauge for solar panel installations in Pakistan. THHN wire is commonly used in residential solar systems.',
                price: 25000,
                images: [],
                category_id: thhnWireCategory ? thhnWireCategory.id : null
              }
            ], { individualHooks: true })
          }
        }
      }
      if (installerCount === 0) {
        const user = await User.create(
          {
            name: 'SOLTRONICS INSTALLER',
            email: 'installer1@soltronic.com',
            password: "soltronic@123",
            type: 'installer',
            avatar: null,
            phone_no: '03000000002',
            address: {
              street: "Soltronic, 75 Block F2 Phase 1 Johar Town, Lahore, Pakistan",
              city: "Lahore",
              state: "Punjab",
              area: 'Phase 1',
              country: "Pakistan",
              zip: "54000",
              latitude: 31.4713455,
              longitude: 74.2801345
            },
            status: 'active',
          });
        if (user) {
          const installer = await Installer.create(
            {
              user_id: user.id,
              experience: 10,

            }
          );
          if (installer) {
            await Project.bulkCreate([{
              installer_id: installer.id,
              name: 'Project 1',
              description: 'Dummy Project in ABC Country DEF State GHI City JKL Area',
              address: {
                street: "Soltronic, 75 Block F2 Phase 1 Johar Town, Lahore, Pakistan",
                city: "Lahore",
                state: "Punjab",
                area: 'Phase 1',
                country: "Pakistan",
                zip: "54000",
                latitude: 31.4713455,
                longitude: 74.2801345
              },
              images: [],
              contact_person: {
                name: "Nouman",
                phone_no: '03000000000',
              },
              start_date: new Date('2024-09-13'),
              end_date: new Date('2025-01-01'),
            },
            {
              installer_id: installer.id,
              name: 'Project 2',
              description: 'Dummy Project in ABC Country DEF State GHI City JKL Area',
              address: {
                street: "Soltronic, 75 Block F2 Phase 1 Johar Town, Lahore, Pakistan",
                city: "Lahore",
                state: "Punjab",
                area: 'Phase 1',
                country: "Pakistan",
                zip: "54000",
                latitude: 31.4713455,
                longitude: 74.2801345
              },
              images: [],
              contact_person: {
                name: "Usama",
                phone_no: '03000000000',
              },
              start_date: new Date('2024-01-13'),
              end_date: new Date('2024-06-23'),
            },
            {
              installer_id: installer.id,
              name: 'Project 3',
              description: 'Dummy Project in ABC Country DEF State GHI City JKL Area',
              address: {
                street: "Soltronic, 75 Block F2 Phase 1 Johar Town, Lahore, Pakistan",
                city: "Lahore",
                state: "Punjab",
                area: 'Phase 1',
                country: "Pakistan",
                zip: "54000",
                latitude: 31.4713455,
                longitude: 74.2801345
              },
              images: [],
              contact_person: {
                name: "Usama",
                phone_no: '03000000000',
              },
              start_date: new Date('2024-01-13'),
              end_date: new Date('2024-06-23'),
            }], { individualHooks: true })
          }
        }
        const user1 = await User.create(
          {
            name: 'SOLAR INSTALLER',
            email: 'installer2@soltronic.com',
            password: "soltronic@123",
            type: 'installer',
            avatar: null,
            phone_no: '03000000002',
            address: {
              street: "Soltronic, 75 Block F2 Phase 1 Johar Town, Lahore, Pakistan",
              city: "Lahore",
              state: "Punjab",
              area: 'Phase 1',
              country: "Pakistan",
              zip: "54000",
              latitude: 31.4713455,
              longitude: 74.2801345
            },
            status: 'active',
          });
        if (user1) {
          const installer = await Installer.create(
            {
              user_id: user1.id,
              experience: 8,

            }
          );
          if (installer) {
            await Project.bulkCreate([{
              installer_id: installer.id,
              name: 'Project 4',
              description: 'Dummy Project in ABC Country DEF State GHI City JKL Area',
              address: {
                street: "Soltronic, 75 Block F2 Phase 1 Johar Town, Lahore, Pakistan",
                city: "Lahore",
                state: "Punjab",
                area: 'Phase 1',
                country: "Pakistan",
                zip: "54000",
                latitude: 31.4713455,
                longitude: 74.2801345
              },
              images: [],
              contact_person: {
                name: "Nouman",
                phone_no: '03000000000',
              },
              start_date: new Date('2024-09-13'),
              end_date: new Date('2025-01-01'),
            },
            {
              installer_id: installer.id,
              name: 'Project 5',
              description: 'Dummy Project in ABC Country DEF State GHI City JKL Area',
              address: {
                street: "Soltronic, 75 Block F2 Phase 1 Johar Town, Lahore, Pakistan",
                city: "Lahore",
                state: "Punjab",
                area: 'Phase 1',
                country: "Pakistan",
                zip: "54000",
                latitude: 31.4713455,
                longitude: 74.2801345
              },
              images: [],
              contact_person: {
                name: "Salman",
                phone_no: '03070000000',
              },
              start_date: new Date('2024-07-10'),
              end_date: new Date('2024-09-23'),
            },
            {
              installer_id: installer.id,
              name: 'Project 6',
              description: 'Dummy Project in ABC Country DEF State GHI City JKL Area',
              address: {
                street: "Soltronic, 75 Block F2 Phase 1 Johar Town, Lahore, Pakistan",
                city: "Lahore",
                state: "Punjab",
                area: 'Phase 1',
                country: "Pakistan",
                zip: "54000",
                latitude: 31.4713455,
                longitude: 74.2801345
              },
              images: [],
              contact_person: {
                name: "Tayyab",
                phone_no: '03000000000',
              },
              start_date: new Date('2024-08-13'),
              end_date: new Date('2024-12-23'),
            }], { individualHooks: true })
          }
        }
      }


      console.log('Database seeded successfully!');
    } else {
      console.log('Database already seeded, skipping...');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
};

seedDatabase(); 
