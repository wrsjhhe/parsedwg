#include <dwg.h>
#include <dwg_api.h>
#include <cstring>
#include <iostream>
#include "ParseFile.h"


int main(int argc,char *argv[])
{
	const char* filePath = "D:\\mygit\\parsedwg\\data\\sample.dwg";

	CParseFile parseFile;
	bool ret = parseFile.Parse(filePath);

	if (!ret)
	{
		std::cout << "error" << std::endl;
	}

	system("pause");
	return 0;
}