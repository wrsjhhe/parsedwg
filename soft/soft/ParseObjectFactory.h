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
	bool parseLayer2Json(Dwg_Object* pObj, Json::Value& jsonItem);  //��

	bool parseLine2Json(Dwg_Object* pObj, Json::Value& jsonItem, CBlockReference* pBlock = nullptr);   //��
	bool parseCircle2Json(Dwg_Object* pObj, Json::Value& jsonItem, CBlockReference* pBlock = nullptr); //Բ
	bool parseLWPolylin2Json(Dwg_Object* pObj, Json::Value& jsonItem, CBlockReference* pBlock = nullptr); //�����
	bool parsePolylin3d2Json(Dwg_Object* pObj, Json::Value& jsonItem, CBlockReference* pBlock = nullptr); //��ά�����
	bool parseBlock2Json(Dwg_Object* pObj, Json::Value& jsonItem, CBlockReference* pBlock = nullptr); //������
private:
	Json::Value getPointJson(const BITCODE_2RD& point);
	Json::Value getPointJson(const BITCODE_3BD& point);
	Json::Value getColorJson(const Utils::RGBA& rgb);
private:
	//const Dwg_Object* m_pObj;
	//Json::Value       m_json;
};

