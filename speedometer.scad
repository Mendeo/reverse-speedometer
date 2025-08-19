use <PTS55F_W.ttf>
digitsFont = "PT Sans:style=Regular";
$fn = 360;
FI = (sqrt(5) + 1) / 2;

kmh(100, true, 18, 270);
skm(100 * FI, 18, 270);

module skm(sd, max_kmh_index, angleWith)
{

	bih = sd * 0.03 / FI;         //Height of big indexes
	sih = bih / FI;        //Height of small indexes
	siw = sih * (2 - FI);  //Width of small indexes
	biw = bih * (2 - FI);  //Width of big indexes
	values = [for (s = [20 : 45]) s, 46, 48, 50, 52, 55, 60, 65, 70, 75, 80, 85, 90, 100, 120, 140, 180, 220, 300, 400, 600];
	for (i = [0 : len(values) - 1])
	{
		kmh_index = 3600 / values[i] / 10;
		dh = pow(kmh_index > 8 ? kmh_index : 8, 1.7) * 0.0004 * sd;       //Digits height
		distanceFromIndexes = FI * dh / 2;
		echo(kmh_index);
		d_angle = -(angleWith * kmh_index / max_kmh_index) - 270 + angleWith / 2;
		rotate([0, 0, d_angle])
		translate([sd / 2 - bih - distanceFromIndexes, 0, 0])
		//rotate([0, 0, i > 3 && i < 9 ? 90 : -90 ])
		rotate([0, 0, -90 ])
		text(str(values[i]), size=dh, halign="center", valign = "center", font = digitsFont);
	}
	for (s = [20 : 720])
	{
		kmh_index = 3600 / s / 10;
		bi_angle = -(angleWith * kmh_index / max_kmh_index) + angleWith / 2; 
		rotate([0, 0, bi_angle])
		translate([-siw / 2, sd / 2 - sih, 0])
		square([siw, sih]);
	}
}

module kmh(sd, showSmallIndexes, maxIndex, angleWith)
{
	dh = 0.05 * sd;       //Digits height
	bih = 0.03 * sd / FI;         //Height of big indexes
	sih = bih / FI;        //Height of small indexes
	siw = sih * (2 - FI);  //Width of small indexes
	biw = bih * (2 - FI);  //Width of big indexes
	distanceFromIndexes = FI * dh / 2;

	for (i = [0 : maxIndex])
	{
		//drawing digits
		spd = i * 10;
		d_angle = -(angleWith * i / maxIndex) - 270 + angleWith / 2;
		rotate([0, 0, d_angle])
		translate([sd / 2 - bih - distanceFromIndexes, 0, 0])
		//rotate([0, 0, i > 3 && i < 9 ? 90 : -90 ])
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

