use <PTS55F_W.ttf>
digitsFont = "PT Sans:style=Regular";
$fn = 360;
FI = (sqrt(5) + 1) / 2;

sd = 100;
bih = 0.03 * sd / FI;         //Height of big indexes
kmh(100, true, 18, 270, bih);
skm(100 * 1.3, 18, 270, bih);

module skm(sd, max_kmh_index, angleWith, bih)
{
	biw = bih * (2 - FI);  //Width of big indexes
	values = [for (s = [20 : 40]) s, 42, 45, 48, 50, 55, 60, 65, 70, 75, 80, 90, 100, 120, 140, 180, 240, 360, 600];
	function angle(kmh_index) = -(angleWith * kmh_index / max_kmh_index) - 270 + angleWith / 2;
	for (i = [0 : len(values)])
	{
		kmh_index = i < len(values) ? 3600 / values[i] / 10 : 0;
		dh = pow(kmh_index > 9 ? kmh_index : 9, 1.7) * 0.00041 * sd;       //Digits height
		distanceFromIndexes = FI * dh / 2;
		d_angle = angle(kmh_index);
		rotate([0, 0, d_angle])
		translate([sd / 2 - bih - distanceFromIndexes, 0, 0])
		rotate([0, 0, -90 ])
		text(str(kmh_index == 0 ? "∞" : values[i]), size=dh, halign="center", valign = "center", font = digitsFont);
	}
	for (s = [20 : 120])
	{
		kmh_index = 3600 / s / 10;
		bi_angle = angle(kmh_index) - 90; 
		rotate([0, 0, bi_angle])
		translate([-biw / 2, sd / 2 - bih, 0])
		square([biw, bih]);
	}
	//Рисуем сплошную линию от 0 до 120 с/км
	intersection()
	{
		//Вырезаем нужный угол
		p3 = angle(3) + 180;
		p0 = angle(0) + 180;
		polygon(points=[[0,0], [-sd * cos(p0), -sd * sin(p0)], [-sd * cos(p3), -sd * sin(p3)]]);
		//Рисуем кольцо
		difference()
		{
			circle(d = sd);
			circle(d = sd - bih * 2);
		}
	}
}

module kmh(sd, showSmallIndexes, maxIndex, angleWith, bih)
{
	sih = bih / FI;        //Height of small indexes
	siw = sih * (2 - FI);  //Width of small indexes
	biw = bih * (2 - FI);  //Width of big indexes

	for (i = [0 : maxIndex])
	{
		//drawing digits
		dh = i % 2 == 0 ? 0.06 * sd : 0.03 * sd;       //Digits height
		distanceFromIndexes = FI * dh / 2;
		spd = i * 10;
		d_angle = -(angleWith * i / maxIndex) - 270 + angleWith / 2;
		rotate([0, 0, d_angle])
		translate([sd / 2 - bih - distanceFromIndexes, 0, 0])
		rotate([0, 0, -90 ])
		text(str(spd), size=dh, halign="center", valign = "center", font = digitsFont);

		//drawing big indexes
		bi_angle = d_angle - 90; 
		rotate([0, 0, bi_angle])
		translate([-biw / 2, sd / 2 - bih, 0])
		square([biw, bih]);

		//drawing small indexes
		if (i < maxIndex)
		{
			for (j = [1 : 9])
			{
				si_angle = bi_angle - angleWith / (maxIndex * 10) * j;
				rotate([0, 0, si_angle])
				if (j == 5)
				{
					translate([-biw / 2, sd / 2 - bih, 0])
					square([biw, bih]);
				}
				else if (showSmallIndexes)
				{
					translate([-siw / 2, sd / 2 - sih, 0])
					square([siw, sih]);
				}
			}
		}
	}
}

