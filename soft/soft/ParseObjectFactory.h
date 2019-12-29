#pragma once
#include "EntityBase.h"
#include <json/json.h>

struct Utils::RGB;

class CParseObjectFactory
{
public:
	explicit CParseObjectFactory(const Dwg_Object* pObj);
	~CParseObjectFactory();

	bool ParseEnt();

	void GetJsonStr(std::string& strJson);

private:
	bool parseLayer2Json();

	bool parseLine2Json();
	bool parseCircle2Json();
	bool parseLWPolylin2Json();

private:
	Json::Value getPointJson(Dwg_Bitcode_3BD point);
	Json::Value getColorJson(Utils::RGB rgb);
private:
	const Dwg_Object* m_pObj;
	Json::Value       m_json;
};

