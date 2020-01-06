#include <dwg.h>
#include <dwg_api.h>
#include <cstring>
#include <iostream>
#include "ParseFile.h"


int main(int argc,char *argv[])
{
	if (argc < 2)
	{
		std::cout << "args err" << std::endl;
		return 0;
	}
	
	const char* filePath = argv[1];

	CParseFile parseFile;
	bool ret = parseFile.Parse(filePath);

	if (!ret)
	{
		std::cout << "error" << std::endl;
	}
	else
	{
		std::cout << parseFile.GetJson() << std::endl;
	}
	return 0;
}