#include <dwg.h>
#include <dwg_api.h>
#include <cstring>
#include <iostream>
#include "ParseFile.h"


int main()
{
	const char* filePath = "D:\\\mygit\\parsedwg\\data\\sample_2018.dwg";

	CParseFile parseFile;
	bool ret = parseFile.Parse(filePath);

	if (!ret)
	{
		std::cout << "error" << std::endl;
	}


/*
	Dwg_Data dwg;
	memset(&dwg, 0, sizeof(Dwg_Data));
	dwg.opts = 0;

	int error = dwg_read_file(filePath, &dwg);
	if (error >= DWG_ERR_CRITICAL)
	{
		std::cout << "err" << std::endl;
		return 1;
	}

	int num = dwg.num_object_refs;

	for (int i = 0; i < dwg.num_objects; ++i)
	{
		auto obj = dwg.object[i];
		switch (obj.type)
		{
		case DWG_TYPE_LINE:
		{
			auto line = dwg.object[i].tio.entity->tio.LINE;
			auto start = line->start;
			auto end = line->end;

			printf("(%f,%f,%f),(%f,%f,%f)\n", start.x, start.y, start.z, end.x, end.y, end.z);
			break;
		}
		case DWG_TYPE_CIRCLE:
		{
			auto circle = dwg.object[i].tio.entity->tio.CIRCLE;
			auto center = circle->center;
			auto radius = circle->radius;

			printf("(%f,%f,%f),%f\n", center.x, center.y, center.z, radius);
			break;
		}
		default:
			break;
		}

	}
	*/
	system("pause");
	return 0;
}