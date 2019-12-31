#pragma once
#include "EntityBase.h"
#include <json/json.h>

struct Utils::RGBA;
class CBlockReference;
class CParseObjectFactory
{
public:
	CParseObjectFactory();
	~CParseObjectFactory();

	bool ParseEnt(Dwg_Object* pObj, Json::Value& jsonItem);
private:
	bool parseEnt(Dwg_Object* pObj, Json::Value& jsonItem, CBlockReference* pBlock = nullptr);

	bool parseEntity2Json(Dwg_Object* pObj, Json::Value& jsonItem, CBlockReference* pBlock = nullptr);
private:
	bool parseLayer2Json(Dwg_Object* pObj, Json::Value& jsonItem);  //层

	bool parseLine2Json(Dwg_Object* pObj, Json::Value& jsonItem, CBlockReference* pBlock = nullptr);   //线
	bool parseCircle2Json(Dwg_Object* pObj, Json::Value& jsonItem, CBlockReference* pBlock = nullptr); //圆
	bool parseLWPolylin2Json(Dwg_Object* pObj, Json::Value& jsonItem, CBlockReference* pBlock = nullptr); //多段线
	bool parsePolylin3d2Json(Dwg_Object* pObj, Json::Value& jsonItem, CBlockReference* pBlock = nullptr); //三维多段线
	bool parseBlock2Json(Dwg_Object* pObj, Json::Value& jsonItem, CBlockReference* pBlock = nullptr); //块引用
private:
	Json::Value getPointJson(const BITCODE_2RD& point);
	Json::Value getPointJson(const BITCODE_3BD& point);
	Json::Value getColorJson(const Utils::RGBA& rgb);
private:
	//const Dwg_Object* m_pObj;
	//Json::Value       m_json;
};

