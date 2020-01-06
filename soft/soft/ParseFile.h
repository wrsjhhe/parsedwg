#pragma once
#include <string>

class CParseFile
{
public:
	CParseFile();
	~CParseFile();


	bool Parse(std::string strFileName);

	std::string GetJson();

private:
	std::string m_strJson;
};