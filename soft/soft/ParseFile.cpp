#include "ParseFile.h"
#include <dwg.h>
#include <dwg_api.h>
#include "ParseObjectFactory.h"
#include <iostream>


CParseFile::CParseFile()
{

}


CParseFile::~CParseFile()
{

}

bool CParseFile::Parse(std::string strFileName)
{
	Dwg_Data dwg;
	memset(&dwg, 0, sizeof(Dwg_Data));
	dwg.opts = 0;

	int error = dwg_read_file(strFileName.c_str(), &dwg);
	if (error >= DWG_ERR_CRITICAL)
	{
		return false;
	}

	int num = dwg.num_object_refs;

	Json::Value jsonRoot;
	for (size_t i = 0; i < dwg.num_objects; ++i)
	{
		auto obj = dwg.object[i];
		CParseObjectFactory parseObj;
		Json::Value jsonItem;
		bool ret = parseObj.ParseEnt(&obj, jsonItem);
		if (!ret)
			continue;

		jsonRoot.append(jsonItem);
	}

	std::ostringstream os;
	Json::StreamWriterBuilder builder;
	builder.settings_["indentation"] = "";
	std::unique_ptr<Json::StreamWriter> writer(builder.newStreamWriter());
	writer->write(jsonRoot, &os);
	std::string str = os.str();
	m_strJson = str;
	return true;
}

std::string CParseFile::GetJson()
{
	return m_strJson;
}